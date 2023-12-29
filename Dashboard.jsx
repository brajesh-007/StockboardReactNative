import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'react-native-svg-charts';

const Dashboard = () => {
  const [stockData1, setStockData1] = useState([]);
  const [stockData2, setStockData2] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch your initial stock data
    fetchData('msft'); // Replace with your default stock symbol
  }, []);

  const fetchData = async (symbol) => {
    try {
      const response1 = await fetch(`https://api.iex.cloud/v1/data/core/historical_prices/${symbol}?range=2m&token=pk_92e729c5b8074e11bdff1bb53bb9d0ff`);
      const data1 = await response1.json();
      setStockData1(data1);
      const response2 = await fetch(`https://api.iex.cloud/v1/data/CORE/QUOTE/${symbol}?token=pk_92e729c5b8074e11bdff1bb53bb9d0ff`);
      const data2 = await response2.json();
      setStockData2(data2);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSearch = () => {
    fetchData(searchQuery);
  };

  const formattedData1 = stockData1.map(item => ({
    date: item.priceDate,
    close: item.close,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a stock"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button title="Search" onPress={handleSearch} />
        <Text style={styles.title}>Stock Market Basic Dashboard</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.companyName}>{stockData2.length > 0 ? stockData2[0].companyName : "Data Not Available"}</Text>
        <LineChart
          style={{ flex: 1 }}
          data={formattedData1.reverse()}
          svg={{ stroke: 'rgb(134, 132, 132)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis data={formattedData1.map(item => item.date)} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.companyName}>{stockData2.length > 0 ? stockData2[0].companyName : "Data Not Available"}</Text>
        <View style={styles.table}>
          <TableRow title="Open" value={stockData2.length > 0 ? stockData2[0].companyName : "Data Not Available"} />
          <TableRow title="Close" value={stockData2.length > 0 ? stockData2[0].close : "Data Not Available"} />
          <TableRow title="Change" value={stockData2.length > 0 ? stockData2[0].change : "Data Not Available"} />
          <TableRow title="Percentage Change" value={stockData2.length > 0 ? stockData2[0].changePercentage : "Data Not Available"} />
          <TableRow title="High" value={stockData2.length > 0 ? stockData2[0].high : "Data Not Available"} />
          <TableRow title="Low" value={stockData2.length > 0 ? stockData2[0].low : "Data Not Available"} />
          <TableRow title="Latest Time" value={stockData2.length > 0 ? stockData2[0].latestTime : "Data Not Available"} />
          <TableRow title="Latest Price" value={stockData2.length > 0 ? stockData2[0].latestPrice : "Data Not Available"} />
          <TableRow title="Currency" value={stockData2.length > 0 ? stockData2[0].currency : "Data Not Available"} />
        </View>
      </View>
    </ScrollView>
  );
};

const TableRow = ({ title, value }) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>{title}</Text>
    <Text style={styles.tableCell}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginRight: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  chartContainer: {
    flex: 1,
    minHeight: 400,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    minHeight: 400,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  companyName: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
  },
});

export default Dashboard;
