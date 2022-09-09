import { HTTP_METHOD, SERVICE } from './enums';

type ApiCallOptions = {
  path: string;
  service: SERVICE;
  method: HTTP_METHOD;
  requiresCredentials?: boolean;
  body?: any;
  onSucces?: () => void;
};

// TODO: toast for errors

export const apiCall = async ({
  path,
  service,
  method,
  requiresCredentials,
  body,
  onSucces,
}: ApiCallOptions) => {
  const apiUrl = SERVICE.USER
    ? String(process.env.USER_SERVICE_API_URL)
    : SERVICE.MATCHING
    ? String(process.env.MATCHING_SERVICE_API_URL)
    : '';
  console.log('test: ', process.env[`${service}_API_URL`]);

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
