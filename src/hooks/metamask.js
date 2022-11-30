import React,{useState,useEffect,useMemo,useCallback} from 'react'
import {injected} from '../components/wallet/injected'
import  {useWeb3React} from '@web3-react/core'

export const MetaMaskContext = React.createContext(null)

export const MetaMaskProvider = ({ children }) => {

    const { activate, account, library, connector, active, deactivate } = useWeb3React()
    const [isActive, setIsActive] = useState(false)
    const [shouldDisable, setShouldDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => 
    {
        connect().then(val =>
        {
            setIsLoading(false)
        })
    }, [])

    const connect = async () => 
    {
        console.log('Connecting To Metamask--')
        setShouldDisable(true)
        try {
            await activate(injected).then(() => 
            {
                setShouldDisable(false)
            })
        } catch(error) 
        {
            console.log('Error in connect -- ',error)
        }
    }

    const disconnect = async () => 
    {
        console.log('Disconnecting wallet--')
        try {
            await deactivate()
        } catch(error) 
        {
            console.log('Error in disconnect ',error)
        }
    }

    const handleIsActive = useCallback(() => 
    {
        console.log("react connected with metmask",active)
        setIsActive(active)
    }, [active])

    useEffect(() => 
    {
        handleIsActive()
    }, [handleIsActive])


    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            disconnect,
            shouldDisable
        }),
        [isActive, isLoading, shouldDisable, account]
    )

    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

export default function useMetaMask() 
{
    const context = React.useContext(MetaMaskContext)

    if (context === undefined) {
        throw new Error("useMetaMask hook must be used with a MetaMaskProvider component")
    }

    return context
}