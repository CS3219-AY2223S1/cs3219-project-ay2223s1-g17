import { toast } from 'react-toastify';
import { HTTP_METHOD, SERVICE } from './enums';

type ApiCallOptions = {
  path: string;
  service: SERVICE;
  method: HTTP_METHOD;
  token?: string;
  body?: Record<string, unknown>;
  allowError?: boolean;
  onSuccess?: () => void;
};

const servicePortMap: Record<SERVICE, number> = {
  USER: Number(process.env.NEXT_PUBLIC_USER_SERVICE_PORT),
  MATCHING: Number(process.env.NEXT_PUBLIC_MATCHING_SERVICE_PORT),
  QUESTION: Number(process.env.NEXT_PUBLIC_QUESTION_SERVICE_PORT),
  COLLABORATION: Number(process.env.NEXT_PUBLIC_COLLABORATION_SERVICE_PORT),
  HISTORY: Number(process.env.NEXT_PUBLIC_HISTORY_SERVICE_PORT),
  COMMUNICATION: Number(process.env.NEXT_PUBLIC_COMMUNICATION_SERVICE_PORT),
};

export const apiCall = async ({
  path,
  service,
  method,
  token,
  body,
  allowError,
  onSuccess,
}: ApiCallOptions) => {
  const apiUrl = `http://localhost:${servicePortMap[service]}${path}`;

  try {
    const res = await fetch(apiUrl, {
      method,
      credentials: token ? 'include' : undefined,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (allowError) return;

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
