import React,{ useState, useEffect, memo, useMemo, useRef } from "react";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, Dimensions, View, Text } from "react-native";

// Hooks
import useFetch from '../../hooks/useFetch';

// Styles
import styles from "./styles";

const url = (id: string) => `https://api.coinlore.net/api/ticker/?id=${id}`;

interface Chart {
  navigation: {
		getParam: (param: string) => any;
		getParams: () => any;
		getState: () => {
			routes: any[]
		};
	}
}

const Chart = ({ navigation }:Chart) => {
	// FIXME It should be navigation.getParam('idCoin) but It returns me a undefined value
	const params = (navigation?.getState()?.routes || []).find((a) => a.name === 'Chart');
	const { idCoin, name } = params.params;
	
	const { error, info, getFetch } = useFetch<CryptoData[]>([], url(idCoin));

	const [infoChart, setInfoChart] = useState<CryptoData[]>([]);
	const [time, setTime] = useState<string[]>([(new Date()).toLocaleTimeString()]);
		
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const startAnim = () => {
		// Will change fadeAnim value to 1 in 30 seconds
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 30000,
			useNativeDriver: false,
			isInteraction: true
		}).start();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const pauseAnim = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 30000,
			useNativeDriver: false,
			isInteraction: true
		}).stop();
	};

	useEffect(() => {
		if (error){
			pauseAnim();
		}
	},[error, pauseAnim]);

	useEffect(() => {
		if (!infoChart.length){
			setInfoChart(info);
			setTime([(new Date()).toLocaleTimeString()]);
		} else{
			setInfoChart((prev) => [...prev, ...info]);
			setTime((prev) => [...prev, (new Date()).toLocaleTimeString()]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[info]);

	useEffect(() => {
		let repetitions= 0;
		const interval = setInterval(() => {
			if (repetitions < 4 && !error){
				getFetch(url(idCoin));
				fadeAnim.setValue(0);
				startAnim();
				repetitions=repetitions+1;
			}
		}, 30000);
		return () => clearInterval(interval);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		console.log('3');
		startAnim();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const chartData = useMemo(
		() => {
			if (infoChart.length){
				return [...infoChart.map((singleInfo: CryptoData)=>Number(singleInfo.price_usd))]
			} else {
				return [0];
			}
		},
		[infoChart]
	);

	return (
		<SafeAreaView
			edges={["bottom"]}
			style={styles.container}
		>
			<View  style={styles.titleContainer}>
				<Text style={styles.title}>{name}</Text>
			</View>
			<View style={styles.countdownContainer}>
				<View style={styles.countdownBackground} />
				<Animated.View 
					style={[
						styles.countdownForeground,
						{ 
							width:fadeAnim.interpolate({
								inputRange: [0, 1],
								outputRange: ['0%', '100%']
							})
						} 
					]} 
				/>
			</View>
			<LineChart
				data={{
					labels: time,
					datasets: [
						{
							data: chartData
						}
					]
				}}
				width={Dimensions.get("window").width} // from react-native
				height={220}
				yAxisLabel="$"
				yAxisInterval={1} // optional, defaults to 1
				chartConfig={{
					backgroundGradientFrom: "blue",
					backgroundGradientTo: "blue",
					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16
					},
					propsForDots: {
						r: "6",
						strokeWidth: "2",
						stroke: "blue"
					}
				}}
				bezier
				style={styles.chart}
			/>
		</SafeAreaView>
	);
};

export default memo(Chart);
