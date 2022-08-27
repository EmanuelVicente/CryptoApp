import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import Toast from 'react-native-root-toast';

export default function useFetch<T>(defaultValue: T, url: string) {
	const [info, setInfo] = useState<T>(defaultValue);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false); 
	const [isRestarting, setIsRestarting] = useState(false); 

	const getFetch = useCallback(async (urlLocal: string, isRestarting:boolean = false ) => {
		console.log(urlLocal);
		setLoading(true);
		setIsRestarting(isRestarting);
		try {
			const result = await fetch(urlLocal);
			const json = await result.json();
			setInfo(json);
			setError("");
		}
		catch(err: any) {
			setError(err.message);
			Toast.show(err.message, {
				duration: Toast.durations.LONG,
				backgroundColor:'red'
			});
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		getFetch(url);
	},[getFetch, url]);

	return {
		info, 
		setInfo,
		error,
		setError,
		getFetch,
		loading,
		setLoading,
		isRestarting,
		setIsRestarting
	};
}