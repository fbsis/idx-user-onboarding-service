# Auth0 Configuration

## User Authentication (username and password)
Routes:
  - /v2/auth/
  - /v2/auth/validate

1. Access your Auth0 account;
2. Go to the Auth0 Dashboard > Applications > AppSync > Show Advanced Settings > Grant Types;
3. Make sure the Password option is checked.

## OTP Authentication (SMS and EMAIL verification code)

Routes:
  - /v2/otp/
  - /v2/otp/validate

<details>
  <summary>Activate Email</summary>

  1. Access your Auth0 account;
  2. Go to the Auth0 Dashboard > Authentication > Passwordless;
  3. Go to option Email > Application;
  4. Mark AppSync application option.
</details>

<details>
  <summary>Activate SMS</summary>

  1. First you need to configure a custom SMS Gateway: [Auth0 Documentation - Configure custom SMS Gateway](https://auth0.com/docs/connections/passwordless/use-sms-gateway-passwordless);
  2. Access your Auth0 account;
  3. Go to the Auth0 Dashboard > Authentication > Passwordless;
  4. Go to option SMS > Application;
  5. Mark AppSync application option.

  JSON connection configuration example:
  ```
  {
    "options": {
      "strategy": "sms",
      "provider": "sms_gateway",
      "gateway_url": "http://18.232.124.35:3000/v2/auth/health",
      "from": "+1 234 567",
      "template": "Your verification code is: @@password@@",
      "brute_force_protection": true,
      "forward_req_info": "true",
      "disable_signup": false,
      "name": "sms",
      "syntax": "md_with_macros",
      "totp": {
        "time_step": 300,
        "length": 6
      },
      "gateway_authentication": {
        "method": "bearer",
        "subject": "urn:Auth0",
        "audience": "urn:InfobipSmsGateway",
        "secret": "ab840383a74733c68f0ac7e5c26d1e0a",
        "secret_base64_encoded": false
      }
    },
    "is_domain_connection": false,
    "enabled_clients": []
  }
```
</details>

## API Authentication (Machine to machine)

Routes:
- /v2/auth/api
- /v2/auth/api/validate
