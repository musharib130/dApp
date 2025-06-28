    import WalletConnection from "../../components/wallet/WalletConnection";

    export default function ModelsController({ children }: { children: React.ReactNode }) {
        return (
            <>
                <WalletConnection />
                {children}
            </>
        )
    }


