import React, { useState } from 'react'
import { Box, Text, Select, SimpleGrid } from '@chakra-ui/react'


const renderIncomeStatement = (incomeStatementHistory) => {

    if (!incomeStatementHistory.length) return 'Income Statement Not Available'

    const incomeStatementEntries = [{ title: 'Breakdown', name: 'endDate'}, { title: 'Total Revenue', name: 'totalRevenue'}, { title: 'Cost of Revenue', name: 'costOfRevenue'}, { title: 'Gross Profit', name: 'grossProfit'}, { title: 'Total Operating Expenses', name: 'totalOperatingExpenses'},
                     { title: 'Operating Income', name: 'operatingIncome'}, { title: 'Total Other Income Expense Net', name: 'totalOtherIncomeExpenseNet'}, { title: 'Pretax Income', name: 'incomeBeforeTax'}, { title: 'Tax Provision', name: 'incomeTaxExpense'},
                     { title: 'Net Income Applicable To Common Shares', name: 'netIncomeApplicableToCommonShares'}, { title: 'Net Income From Continuing Ops', name: 'netIncomeFromContinuingOps'}, { title: 'Interest Expense', name: 'interestExpense'}, { title: 'EBIT', name: 'ebit'}]

    return (
            <Box>
            <Text fontWeight='bold' as='mark' fontSize='3xl'>Income Statement</Text><br />

            <SimpleGrid columns={1} p={{ base: '1', xl: '5' }} as='samp' fontSize={{ base: 'xs', xl: 'md' }}>
                <Box bg='#B794F4' height={{ bg: '600px', sm: '800px' }} p={{ base: '3', xl: '10' }}>
                <table style={{ width: '100%'}}>
                    {incomeStatementEntries.map(({ title, name}) => (
                        <>
                        <tr>
                            <th>{title}</th>
                            {incomeStatementHistory.map(item => (
                                <td>{item[name]?.fmt || '-'}</td>
                                ))}
                        </tr>
                        <br />
                        </>
                    ))}
                </table>
                </Box>
            </SimpleGrid>
        </Box>
    )
}



const renderBalanceSheet = (balanceSheetStatements) => {

    if (!balanceSheetStatements.length) return 'Balance Sheet Not Available'

    const balanceSheetEntries = [{ title: 'Breakdown', name: 'endDate'}, { title: 'Total Assets', name: 'totalAssets'}, { title: 'Total Current Assets', name: 'totalCurrentAssets'},
                                 { title: 'Total Liabilities', name: 'totalLiab'}, { title: 'Total Current Liabilities', name: 'totalCurrentLiabilities'}, { title: 'Total Stockholder Equity', name: 'totalStockholderEquity'},
                                 { title: 'Net Tangible Assets', name: 'netTangibleAssets'}, { title: 'Short Term Investments', name: 'shortTermInvestments'}, { title: 'Long Term Investments', name: 'longTermInvestments'},
                                 { title: 'Long Term Debt', name: 'longTermDebt'}, { title: 'Net Debt', name: 'shortLongTermDebt'}, { title: 'Treasury Stock', name: 'treasuryStock'}, { title: 'Cash', name: 'cash'},
                                 { title: 'Net Receivables', name: 'netReceivables'}, { title: 'Inventory', name: 'inventory'}, { title: 'Property, Plant, Equipment', name: 'propertyPlantEquipment'},
                                 { title: 'Accounts Payable', name: 'accountsPayable'}, { title: 'Common Stock', name: 'commonStock'}, { title: 'Retained Earnings', name: 'retainedEarnings'}]

    return (
            <Box>
            <Text fontWeight='bold' as='mark' fontSize='3xl'>Balance Sheet</Text><br />

            <SimpleGrid columns={1} p={{ base: '1', xl: '5' }} as='samp' fontSize={{ base: 'xs', xl: 'md' }}>
                <Box bg='#B794F4' height={{ bg: '600px', sm: '800px' }} p={{ base: '3', xl: '10' }}>
                <table style={{ width: '100%'}}>
                    {balanceSheetEntries.map(({ title, name}) => (
                        <>
                        <tr>
                            <th>{title}</th>
                            {balanceSheetStatements.map(item => (
                                <td>{item[name]?.fmt || '-'}</td>
                                ))}
                        </tr>
                        <br />
                        </>
                    ))}
                </table>
                </Box>
            </SimpleGrid>
        </Box>
    )
}


const renderCashFlow = (cashflowStatementHistory) => {

    if (!cashflowStatementHistory.length) return 'Cash Flow Statement Not Available'

    const cashFlowEntries = [{ title: 'Breakdown', name: 'endDate'}, { title: 'Net Income', name: 'netIncome'}, { title: 'Depreciation', name: 'depreciation'}, { title: 'Change To Net Income', name: 'changeToNetIncome'},
                             { title: 'Change To Account Receivables', name: 'changeToAccountReceivables'}, { title: 'Change To Liabilities', name: 'changeToLiabilities'}, { title: 'Change To Inventory', name: 'changeToInventory'},
                             { title: 'Change To Operating Activities', name: 'changeToOperatingActivities'}, { title: 'Total Cash From Operating Activities', name: 'totalCashFromOperatingActivities'}, { title: 'Capital Expenditures', name: 'capitalExpenditures'},
                             { title: 'Investments', name: 'investments'}, { title: 'Total CF From Investing act.', name: 'totalCashflowsFromInvestingActivities'}, { title: 'Dividends Paid', name: 'dividendsPaid'},
                             { title: 'Net Borrowings', name: 'netBorrowings'}, { title: 'Total Cash From Financing Activities', name: 'totalCashFromFinancingActivities'}, { title: 'Change In Cash', name: 'changeInCash'},
                             { title: 'Repurchase of Stock', name: 'repurchaseOfStock'}, { title: 'Issuance of Stock', name: 'issuanceOfStock'}]

    return (
            <Box>
            <Text fontWeight='bold' as='mark' fontSize='3xl'>Cashflow Statement</Text><br />

            <SimpleGrid columns={1} p={{ base: '1', xl: '5' }} as='samp' fontSize={{ base: 'xs', xl: 'md' }}>
                <Box bg='#B794F4' height={{ bg: '600px', sm: '800px' }} p={{ base: '3', xl: '10' }}>
                <table style={{ width: '100%'}}>
                    {cashFlowEntries.map(({ title, name}) => (
                        <>
                        <tr>
                            <th>{title}</th>
                            {cashflowStatementHistory.map(item => (
                                <td>{item[name]?.fmt || '-'}</td>
                                ))}
                        </tr>
                        <br />
                        </>
                    ))}
                </table>
                </Box>
            </SimpleGrid>
        </Box>
    )
}

    



const StockFinancialsComponent = ({ details: { incomeStatementHistory, balanceSheetHistory, cashflowStatementHistory }}) => {




    const [page, setPage] = useState('incomeStatement')
    
  return (
    <>

        <Select placeholder='Select option' size='sm' w='150px' mt='2' value={page} onChange={e => setPage(e.target.value)}>
            <option value='incomeStatement'>Income Statement</option>
            <option value='balanceSheet'>Balance Sheet</option>
            <option value='cashFlow'>Cash Flow</option>
        </Select>
        <br />

        {page === 'incomeStatement' && renderIncomeStatement(incomeStatementHistory.incomeStatementHistory)}
        {page === 'balanceSheet' && renderBalanceSheet(balanceSheetHistory.balanceSheetStatements)}
        {page === 'cashFlow' && renderCashFlow(cashflowStatementHistory.cashflowStatements)}</>

  )
}

export default StockFinancialsComponent