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
  const apiUrl = `${
    process.env[`NEXT_PUBLIC_${service}_SERVICE_API_URL`]
  }/${path}`;

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
