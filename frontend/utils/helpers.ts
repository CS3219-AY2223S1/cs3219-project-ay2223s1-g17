import { toast } from 'react-toastify';
import { HTTP_METHOD, SERVICE } from './enums';

type ApiCallOptions = {
  path: string;
  service: SERVICE;
  method: HTTP_METHOD;
  requiresCredentials?: boolean;
  body?: any;
  onSuccess?: () => void;
};

const servicePortMap: Record<SERVICE, Number> = {
  USER: Number(process.env.NEXT_PUBLIC_USER_SERVICE_PORT),
  MATCHING: Number(process.env.NEXT_PUBLIC_MATCHING_SERVICE_PORT),
};

export const apiCall = async ({
  path,
  service,
  method,
  requiresCredentials,
  body,
  onSuccess,
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

    if (!res.ok) {
      const { error } = await res.json();
      return handleErrorWithToast(error);
    }

    return onSuccess ? onSuccess() : res.json();
  } catch (error) {
    handleErrorWithToast(error);
  }
};

export const handleErrorWithToast = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(errorMessage);
  toast.error(errorMessage);
};
