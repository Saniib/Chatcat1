import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const searchFilterFunction = (text) => {
	const newData = this.arrayholder.filter((item) => {
		const itemData = `${item.name.title.toUpperCase()}
	  ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;

		const textData = text.toUpperCase();

		return itemData.indexOf(textData) > -1;
	});

	this.setState({ data: newData });
};

const SearchBar = () => {
	return (
		<Searchbar
			placeholder="SEARCH FOR....!"
			style={{
				borderRadius: 30,
				borderWidth: 2,
				borderColor: '#28324B',
			}}
			onChangeText={(text) => searchFilterFunction(text)}
		/>
	);
};

export default SearchBar;
