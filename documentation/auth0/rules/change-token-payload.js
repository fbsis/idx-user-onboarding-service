function changeTokenPayload(user, context, callback) {
  // console.log('USER', user);
  // console.log('CONTEXT', context);

  const tokenCustomClaimNamespace = 'https://core.hom-bpp.com.br';

  const defaultPasswordCredentialsAudience = ['pixdirect&scheduling'];

  const dbConnectionName = {
  	passwordCredentials: 'legacy-dynamodb',
    clientCredentials: 'core-database'
  };

  const requestDbConnectionName = context.connection;

  // Set token payload: audience
  const audience = user.user_metadata.audience || '';
  if (audience) {
    context.accessToken.scope = audience;
  } else {
    if (requestDbConnectionName === dbConnectionName.passwordCredentials) {
    	context.accessToken.scope = defaultPasswordCredentialsAudience;
  	}
  }

  // Set token custom claim payload
  const tokenCustomClaimPayload = {
  	"usr": user.username
  };

  if (requestDbConnectionName === dbConnectionName.passwordCredentials) {
    Object.assign(tokenCustomClaimPayload, {
    	"id": user.user_metadata.id
    });
  }

  context.accessToken[tokenCustomClaimNamespace + ''] = tokenCustomClaimPayload;

  return callback(null, user, context);
}
