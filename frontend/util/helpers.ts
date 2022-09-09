import { HTTP_METHOD, SERVICE } from './enums';

type ApiCallOptions = {
  path: string;
  service: SERVICE;
  method: HTTP_METHOD;
  requiresCredentials?: boolean;
  body?: any;
  onSucces?: () => void;
};

export const apiCall = async ({
  path,
  service,
  method,
  requiresCredentials,
  body,
  onSucces,
}: ApiCallOptions) => {
  let apiUrl = '';

  switch (service) {
    case SERVICE.USER:
      apiUrl = String(process.env.USER_SERVICE_API_URL);
      break;
    case SERVICE.MATCHING:
      apiUrl = String(process.env.MATCHING_SERVICE_API_URL);
      break;
    default:
      break;
  }

  const res = await fetch(`${apiUrl}/${path}`, {
    method: method,
    credentials: requiresCredentials ? 'include' : undefined,
    body: body,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
  });

  if (onSucces) onSucces();
  return res.json();
};
