import { SignJWT, importPKCS8 } from "jose";

const GA4_PROPERTY_ID = "528547494";

type ServiceAccountKey = {
  client_email: string;
  private_key: string;
};

async function getAccessToken(): Promise<string | null> {
  const raw = process.env.GA4_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;

  try {
    const key: ServiceAccountKey = JSON.parse(raw);
    const privateKey = await importPKCS8(key.private_key, "RS256");

    const jwt = await new SignJWT({
      scope: "https://www.googleapis.com/auth/analytics.readonly",
    })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setIssuer(key.client_email)
      .setSubject(key.client_email)
      .setAudience("https://oauth2.googleapis.com/token")
      .setExpirationTime("1h")
      .sign(privateKey);

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch (err) {
    console.error("[ga4] Failed to get access token", err);
    return null;
  }
}

export async function getMostViewedSlug(): Promise<string | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          dimensionFilter: {
            filter: {
              fieldName: "pagePath",
              stringFilter: { matchType: "BEGINS_WITH", value: "/stories/" },
            },
          },
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 1,
        }),
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;
    const data = (await res.json()) as {
      rows?: { dimensionValues: { value: string }[] }[];
    };

    const path = data.rows?.[0]?.dimensionValues?.[0]?.value;
    if (!path) return null;

    return path.replace(/^\/stories\//, "").replace(/\/$/, "") || null;
  } catch (err) {
    console.error("[ga4] Failed to fetch most viewed", err);
    return null;
  }
}
