import React,{ useState,useEffect, memo, useContext, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Feather from '@expo/vector-icons/Feather';

// Hooks
import useFetch from '../../hooks/useFetch';

// Component
import Input from '../../components/input';

// Context 
import { AuthenticationContext } from '../../context/authentication';

// Styles
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const url = (start: number, limit:number) => `https://api.coinlore.net/api/tickers/?start=${start}&limit=${limit}`;

interface CryptoResult {
	data: CryptoData[];
  info: {
    coins_num?: number;
    time?: number;
  }
}

interface CryptoListProps {
  navigation: {
		navigate: (url: string, params: any) => void;
	}
}

const CryptoList = ({ navigation }:CryptoListProps) => {
	const { t } = useTranslation();
	const [infoList, setInfoList] = useState<CryptoResult>({ data:[], info:{} });

	const { error, info, getFetch, loading, isRestarting } = useFetch<CryptoResult>({ data:[], info:{} }, url(0,50));

	const [filter, setFilter] = useState<string>("");
	const [isFiltered, setIsFiltered] = useState(false);
	const { name } = useContext(AuthenticationContext);
	
	useEffect(() => {
		setInfoList(prev => {
			if (isRestarting) return info;
			return ({ ...info, data: [...prev.data, ...info.data] })
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [info]);

	const getMoreInfo = useCallback(() => {
		getFetch(url(infoList.data.length + 50, 50));
	},[getFetch, infoList]);

	const renderItem = useCallback(({ item }: {item:CryptoData}) =>{
		return (
			<TouchableOpacity 
				disabled={!!error}
				onPress={() => navigation.navigate(
					'Chart',
					{
						idCoin: item.id,
						name: item.name
					})}
			>
				<View style={styles.listComponentContainer}>
					<Text style={styles.textListComponent}>{`${item.name} ${item.percent_change_24h}`}</Text>
					<Feather name="arrow-right" size={32} color="black" />
				</View>
			</TouchableOpacity>
		)
	},[error, navigation]);

	const onFilter = useCallback(()=> {
		if (!!filter.trim() && !!Number(filter) ){
			setIsFiltered(true);
			setInfoList(prev => ({ ...prev, data: prev.data.filter((value : CryptoData) => Number(value.percent_change_24h) > Number(filter)) }))
		} else {
			setIsFiltered(false);
			getFetch(url(0,50), true);
		}
	},[filter, getFetch]);

	return (
		<SafeAreaView
			edges={["bottom"]}
			style={styles.container}
		>
			<Text style={styles.title}>{`${t('crypto.welcome')}: ${name}`}</Text>
			<View style={styles.containerFilter}>
				<Input keyboardType="default" style={styles.input} setValue={setFilter} value={filter} />
				<TouchableOpacity style={styles.button} onPress={onFilter}>
					<Text style={styles.textButton}>{t('crypto.filter')}</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				style={styles.flatList}
				data={infoList.data}
				renderItem={renderItem}
				onEndReached={!isFiltered ? getMoreInfo : undefined}
				onRefresh={!isFiltered ?  () => getFetch(url(0,50), true) : undefined}
				keyExtractor={(item:CryptoData) => item.id}
				refreshing={loading && !isFiltered}
				ListFooterComponent={!isFiltered ? <ActivityIndicator /> : <></>}
			/>
		</SafeAreaView>
	);
};

export default memo(CryptoList);
