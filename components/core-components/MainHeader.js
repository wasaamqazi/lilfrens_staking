import Link from 'next/link'

export default function MainHeader({style}) {
    return (
        <div className="mainHeader" style={style}>
            <div className="left">
                <Link href="/">
                    <a className="logo">
                        <img src="/assets/lilfrens-logo.png"></img>
                    </a>
                </Link>
            </div>
            <div className="right">
                <Link href="/stake"><a className="cta">stake</a></Link>
                <Link href="/pfp"><a className="cta">pfp</a></Link>
                <Link href="https://auction.lilfrens.xyz/"><a className="cta">Auction</a></Link>
            </div>
        </div>
    )
}