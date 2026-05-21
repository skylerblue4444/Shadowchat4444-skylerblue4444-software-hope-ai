# Supplier API Integration Notes

## Official provider constraints

DHgate Open Platform documentation confirms that the official environment uses real DHgate online data and routes calls through `http://api.dhgate.com/dop/router`. API calls require a DHgate account, OAuth/access token setup, and prior API parameters. Write operations directly affect online data, so the SkyCoin4444 integration must treat ordering and supplier actions as review-first and provider-gated until credentials, permissions, and sandbox/production approval are confirmed.

Alibaba.com Open API documentation confirms that product and order integrations require developer registration, an app key, app secret, OAuth authorization, access tokens, signed TOP-style API calls, and common request parameters such as `method`, `app_key`, `timestamp`, `format`, `v`, `sign_method`, and `sign`. The API is designed for synchronizing product information and order information between marketplace systems and proprietary systems. Therefore, the application should store provider credentials only in environment variables and should expose provider status transparently to admins.

## Implementation implications

The upgrade should add a supplier provider layer with adapters for `admin_import`, `dhgate`, and `alibaba`. Without live credentials, the app should not pretend to have live API results. Instead, it should support real admin imports immediately and expose provider configuration state. Product search can combine approved imported catalog data with provider-synced items once credentials are present. Customer checkout should create an admin-reviewed order request and apply the configured $44 cart/service fee or priced-cart economics before any external supplier purchase is executed.

## Required runtime variables for live mode

| Provider | Variables |
|---|---|
| DHgate | `DHGATE_APP_KEY`, `DHGATE_APP_SECRET`, `DHGATE_ACCESS_TOKEN`, `DHGATE_API_BASE` |
| Alibaba | `ALIBABA_APP_KEY`, `ALIBABA_APP_SECRET`, `ALIBABA_ACCESS_TOKEN`, `ALIBABA_API_BASE` |

## Safety rule

All supplier popularity, reviews, images, and orders must be either imported/admin-approved, returned by a configured live provider, or explicitly labeled as curated/demo content. No fake live sales or fake supplier reviews should be presented as real.
