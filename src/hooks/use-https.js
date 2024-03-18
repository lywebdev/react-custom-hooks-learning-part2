import {useState} from "react";

const useHttp = (requestOptions) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttpRequest = async (productText, manageData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestOptions.endpoint,
                {
                    method: requestOptions.method,
                    headers: requestOptions.headers,
                    body: JSON.stringify(requestOptions.body)
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
    };

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