import {useCallback, useState} from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttpRequest = useCallback(async (requestOptions, manageData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestOptions.endpoint,
                {
                    method: requestOptions.method ? requestOptions.method : 'GET',
                    headers: requestOptions.headers ? requestOptions.headers : {},
                    body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка запроса.");
            }

            const data = await response.json();
            manageData(data);
        } catch (err) {
            setError(err.message || "Что-то пошло не так...");
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendHttpRequest,
    };
    /**
     * The same thing as:
     * {
     *     isLoading: isLoading,
     *     error: error,
     *     sendHttpRequest: sendHttpRequest
     * }
     */
}


export default useHttp;