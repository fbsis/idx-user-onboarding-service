import {
  healthCheckPath,
  signInPath,
  validateTokenPath,
  loginPasswordPath,
  sendOtpTokenPath,
  validateOtpTokenPath,
  loginClientPath,
  validateClientTokenPath,
  aliasLoginClientPath,
  aliasLegacyLoginClientPath,
  aliasValidateClientPath,
  aliasLegacyValidateClientPath,
  validatePasswordTokenPath,
  aliasValidateClientTokenPath,
  sendSmsPath,
  aliasLoginClientCredentialsPath,
  aliasLoginPasswordPath
} from './paths/'

export default {
  '/v2/auth/health': healthCheckPath,
  '/v2/auth/': signInPath,
  '/v2/auth/validate': validateTokenPath,
  '/v2/otp/': sendOtpTokenPath,
  '/v2/otp/validate': validateOtpTokenPath,
  '/v2/auth/api/': loginClientPath,
  '/v2/auth/api/validate': validateClientTokenPath,
  '/v2/auth/sms': sendSmsPath,
  '/authorizationserver/oauth2/clientcredentials/token': aliasLoginClientPath,
  '/authorizationserver/clientcredentials/token': aliasLoginClientCredentialsPath,
  '/authorizationserver/clientcredentials/validate': aliasValidateClientTokenPath,
  '/legacy/oauth2/token': aliasLegacyLoginClientPath,
  '/client/validate': aliasValidateClientPath,
  '/credentials/validate': aliasLegacyValidateClientPath,
  '/authorizationserver/oauth2/password/tokendigital': loginPasswordPath,
  '/authorizationserver/digital/token': aliasLoginPasswordPath,
  '/authorizationserver/digital/validate': validatePasswordTokenPath
}
