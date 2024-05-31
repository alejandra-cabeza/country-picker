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

    const totalPages = Math.ceil(dataToShow.length / entriesPerPage);

    const handleCheckboxChange = (country) => {
        setSelectedCountries((prevSelected) =>
            prevSelected.some((c) => c.code === country.code)
                ? prevSelected.filter((c) => c.code !== country.code)
                : [...prevSelected, country]
        );
    };

    const handleResetClick = () => {
        setSelectedCountries([]);
        setCurrentPage(1);
        setSearchTerm('');
    };

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
        const filteredData = countries.data.filter(item => 
            item.name.toString().toLowerCase().includes(value.toLowerCase())
          );
        setDataToShow(filteredData);
    };

    const handleEntriesChange = (value) => {
        setEntriesPerPage(value);
        setCurrentPage(1);
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
                        setCurrentPage={setCurrentPage}
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



