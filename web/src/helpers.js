import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? item : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === key && e.oldValue !== e.newValue) {
      setStoredValue(e.newValue);
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  // Return a function to remove localstorage item
  const removeValue = value => {
    try {
      // remove item from local storage
      window.localStorage.removeItem(key);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue, removeValue];
}

/**
 * Custom hook that filters technologyIDs by sector and breaks them into 2 arrays: 
 *  - those that are selected in the portfolio 
 *  - those that are NOT selected 
 * This information is reused across multiple pages in the application - looking 
 * at all the solutions for a portfolio and looking at solutions in a sector. 
 * Putting it in a common hooks location allows it to be reused.
 * 
 * @param {*} technologyMetadata - derived from config and contains information 
 *                                 about the different technology sectors and solutions
 * @param {*} sectorName - Name of the sector that is being processed
 * @returns 
 * object with the given structure:
 * {
 *   portfolioSolutions, // all selected solutions across sectors for the portfolio
 *   sectorTechnologyIDsInPortfolio,  // selected solution IDs in given sector
 *   sectorTechnologyIDsNotInPortfolio, // solution IDS in given sector that are NOT selected
 * }
 */
export function usePortfolioSolutions(technologyMetadata, sectorName){
  const workbookState = useSelector(state => state.workbook);

  const [portfolioSolutions, setPortfolioSolutions] = useState([]);
  const [sectorTechnologyIDsInPortfolio, setSectorTechnologyIDsInPortfolio] =
    useState([]);
  const [sectorTechnologyIDsNotInPortfolio, setSectorTechnologyIDsNotInPortfolio] =
    useState([]);

  const technologyIDsInSector = useMemo(
    () =>
      Object.keys(technologyMetadata).filter(
        (techologyID) => technologyMetadata[techologyID].sector === sectorName
      ),
    [technologyMetadata, sectorName]
  );
  
  useEffect(() => {
    setPortfolioSolutions(
      workbookState.workbook && workbookState.workbook.ui
        ? workbookState.workbook.ui.portfolioSolutions || []
        : []
    );
  }, [workbookState.workbook]);
  
  useEffect(() => {
    setSectorTechnologyIDsInPortfolio(
      technologyIDsInSector.filter((id) => portfolioSolutions.includes(id))
    );
    setSectorTechnologyIDsNotInPortfolio(
      technologyIDsInSector.filter((id) => !portfolioSolutions.includes(id))
    );
  }, [portfolioSolutions, technologyIDsInSector]);
  
  return {
    portfolioSolutions, // all the selected solutions across sectors in the portfolio
    sectorTechnologyIDsInPortfolio,  // technology solution IDs in given sector that are selected
    sectorTechnologyIDsNotInPortfolio, // technology solution IDS in given sector NOT selected
  }
}

export function useSolutionMetaData(technologyStaticMetaData, sectorName) {
  const metadataIDsInSector = useMemo(
    () =>
      Object.keys(technologyStaticMetaData).filter(
        (techologyID) => technologyStaticMetaData[techologyID].sector === sectorName
      ),
    [technologyStaticMetaData, sectorName]
  );

  return {
    metadataIDsInSector
  }
}