import { HTTP_METHOD, Service } from './enums';

type ApiCallOptions = {
  path: string;
  service: Service;
  method: HTTP_METHOD;
  requiresCredentials?: boolean;
  body?: any;
  onSucces: () => void;
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
    case 'USER':
      apiUrl = `${process.env.USER_SERVICE_API_URL}/${path}`;
      break;
    case 'MATCHING':
      apiUrl = `${process.env.MATCHING_SERVICE_API_URL}/${path}`;
      break;
    default:
      break;
  }

  const res = await fetch(apiUrl, {
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
