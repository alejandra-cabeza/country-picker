import React, { useState, useMemo } from 'react';
import ToolBar from './ToolBar';
import Table from './Table';
import Pagination from './Pagination';
import countries from '../../constants/countries';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [dataToShow, setDataToShow] = useState(countries.data.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage));

    const totalPages = Math.ceil(countries.data.length / entriesPerPage);

    const handleCheckboxChange = (country) => {
        setSelectedCountries((prevSelected) =>
            prevSelected.some((c) => c.code === country.code)
                ? prevSelected.filter((c) => c.code !== country.code)
                : [...prevSelected, country]
        );
    };

    const handleResetClick = () => {
        const defaultEntriesPerPage = 10;
        const initialFilteredData = [...countries.data];

        setSearchTerm('');
        setCurrentPage(1);
        setSelectedCountries([]);
        setEntriesPerPage(defaultEntriesPerPage);

        const start = 0;
        const end = start + defaultEntriesPerPage;
        setDataToShow(initialFilteredData.slice(start, end));
    };
    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
        const filteredData = countries.data.filter(item => 
            item.name.toString().toLowerCase().includes(value.toLowerCase())
        );
        const start = 0;
        const end = start + entriesPerPage;
        setDataToShow(filteredData.slice(start, end));
    };
    
    const handleEntriesChange = (value) => {
        setEntriesPerPage(value);
        setCurrentPage(1);
        const start = 0;
        const end = start + value;
        setDataToShow(countries.data.slice(start, end));
    };
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
        const start = (page - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        setDataToShow(countries.data.slice(start, end));
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
            
            {dataToShow.length ? (
                <>
                    <Table
                        fetchedCountries={dataToShow}
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



