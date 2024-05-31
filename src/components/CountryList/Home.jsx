import React, { useState, useEffect, useCallback } from 'react';
import ToolBar from './ToolBar';
import Table from './Table';
import Pagination from './Pagination';
import countries from '../../constants/countries.json';

function Home() {
    const [state, setState] = useState({
        searchTerm: '',
        selectedCountries: [],
        currentPage: 1,
        totalPages: 1,
        entriesPerPage: 10,
        countryList: countries.data,
        dataToShow: [],
    });

    const { searchTerm, selectedCountries, currentPage, totalPages, entriesPerPage, countryList, dataToShow } = state;

    const updateDataToShow = useCallback((page, entries) => {
        const start = (page - 1) * entries;
        const end = start + entries;
        return countryList.slice(start, end);
    }, [countryList]);

    useEffect(() => {
        const newTotalPages = Math.ceil(countryList.length / entriesPerPage);
        const newDataToShow = updateDataToShow(currentPage, entriesPerPage);
        setState(prevState => ({ ...prevState, totalPages: newTotalPages, dataToShow: newDataToShow }));
    }, [entriesPerPage, countryList, currentPage, updateDataToShow]);

    const handleCheckboxChange = useCallback((country) => {
        setState(prevState => ({
            ...prevState,
            selectedCountries: prevState.selectedCountries.some((c) => c.code === country.code)
                ? prevState.selectedCountries.filter((c) => c.code !== country.code)
                : [...prevState.selectedCountries, country]
        }));
    }, []);

    const handleResetClick = () => {
        setState(prevState => ({
            ...prevState,
            selectedCountries: [],
            currentPage: 1,
            searchTerm: '',
            countryList: countries.data,
        }));
    };

    const handleSearchTermChange = (value) => {
        setState(prevState => ({
            ...prevState,
            searchTerm: value,
            currentPage: 1,
            countryList: countries.data.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
        }));
    };

    const handleEntriesChange = (value) => {
        setState(prevState => ({
            ...prevState,
            entriesPerPage: value,
            currentPage: 1,
            dataToShow: updateDataToShow(1, value)
        }));
    };

    const handlePageChange = (page) => {
        setState(prevState => ({
            ...prevState,
            currentPage: page,
            dataToShow: updateDataToShow(page, entriesPerPage)
        }));
    };

    const handleButtonClick = () => {
        const selectedCountryNames = selectedCountries.map((country) => country.code);
        alert(selectedCountryNames.join(', '));
    };

    return (
        <div className='block w-full md:w-3/4 mx-auto'>
            <h1 className='text-2xl font-bold mb-8'>
                Country List
            </h1>
            <ToolBar
                handleButtonClick={handleButtonClick}
                onResetClick={handleResetClick}
                searchTerm={searchTerm}
                selectedCountries={selectedCountries}
                onSearchTermChange={handleSearchTermChange}
            />
            {countryList.length ? (
                <>
                    <Table
                        countryList={dataToShow}
                        selectedCountries={selectedCountries}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        entriesPerPage={entriesPerPage}
                        handleEntriesChange={handleEntriesChange}
                        onHandlePageChange={handlePageChange}
                        onButtonClick={handleButtonClick}
                    />
                </>
            ) : (
                <div className='text-xl m-12'>No countries found</div>
            )}
        </div>
    );
}

export default Home;
