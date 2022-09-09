import { HTTP_METHOD, SERVICE } from './enums';

type ApiCallOptions = {
  path: string;
  service: SERVICE;
  method: HTTP_METHOD;
  requiresCredentials?: boolean;
  body?: any;
  onSucces?: () => void;
};

const servicePortMap: Record<SERVICE, Number> = {
  USER: Number(process.env.NEXT_PUBLIC_USER_SERVICE_PORT),
  MATCHING: Number(process.env.NEXT_PUBLIC_MATCHING_SERVICE_PORT),
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
  const apiUrl = `http://localhost:${servicePortMap[service]}${path}`;

  try {
    const res = await fetch(apiUrl, {
      method,
      credentials: requiresCredentials ? 'include' : undefined,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: JSON.stringify(body),
    });
    return onSucces ? onSucces() : res.json();
  } catch (error) {
    console.error(error);
  }
};
