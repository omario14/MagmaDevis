import React from 'react'
import "./Mail.css"
const Mail = (props) => {
    return (
        <div className='previewbody' >
            <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#e1e1e1">
                <tr>
                    <td height="20"></td>
                </tr>
                <tr>
                    <td>
                        <table width="600" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#ffffff" style={{ borderRadius: "10px 10px 0 0" }}>
                            <tr className="hiddenMobile">
                                <td height="40"></td>
                            </tr>
                            <tr className="visibleMobile">
                                <td height="30"></td>
                            </tr>

                            <tr>
                                <td>
                                    <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table width="480" border="0" cellPadding="0" cellSpacing="0" align="left" className="col">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left"> <img src="https://i.ibb.co/SdKhdhB/logo-black.png" width="150" alt="logo" border="0" /></td>
                                                            </tr>
                                                            <tr className="hiddenMobile">
                                                                <td height="40"></td>
                                                            </tr>
                                                            <tr className="visibleMobile">
                                                                <td height="20"></td>
                                                            </tr>
                                                            <tr>

                                                                <td style={{ fontSize: "14px", color: "#5b5b5b", fontFamily: " 'Open Sans', sans-serif", lineHeight: "21px", verticalAlign: "top", textAlign: "left" }}>
                                                                    Bonjour,
                                                                    <br /> Je vous contacte afin de solliciter un devis pour des travaux d'impression de <b> <span name="_product">{props.produit && (["autres", "autre produit"].some(item => props.produit.name.toLowerCase() === item) ? props.autres.nom : props.produit.name)}</span></b>. &nbsp;
                                                                    <br />Ci-dessous, vous trouverez les spécificités techniques:
                                                                </td>
                                                            </tr>
                                                            {props.produit && ((props.produit.name.toLowerCase() === "autres" && props.produit.id.substring(0, props.produit.id.indexOf('-')) !== 'sbcd') && <tr>
                                                                <td style={{ fontSize: "14px", color: "#5b5b5b", fontFamily: " 'Open Sans', sans-serif", lineHeight: "21px", verticalAlign: "top", textAlign: "left" }}>
                                                                    <br />
                                                                    <br />
                                                                    {props.autres && props.autres.contenu}

                                                                </td>
                                                            </tr>
                                                            )}

                                                        </tbody>
                                                    </table>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            {props.produit && ((props.produit.name.toLowerCase() !== "autres") &&
                <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#e1e1e1">
                    <tbody>
                        <tr>
                            <td>
                                <table width="600" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#ffffff" >
                                    <tbody>
                                        <tr />
                                        <tr className="hiddenMobile">
                                            <td height="20"></td>
                                        </tr>
                                        <tr className="visibleMobile">
                                            <td height="20"></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                                                    <tbody>


                                                        <tr>
                                                            <td height="10" colSpan="4"></td>
                                                        </tr>
                                                        {props.produit &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article">
                                                                        <b>Produit : </b>
                                                                    </td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.produit.name}</td>

                                                                </tr>

                                                            </>}
                                                        {props.format &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article">
                                                                        <b>Format : </b>
                                                                    </td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.format.contenu}</td>

                                                                </tr>

                                                            </>}
                                                        {props.typePapier &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Type de Papier Interieur :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.typePapier.contenu}</td>

                                                                </tr>

                                                            </>}
                                                        {props.nbrPage > 0 &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article">
                                                                        <b> Nombre de Page :</b>
                                                                    </td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.nbrPage}</td>

                                                                </tr>

                                                            </>}
                                                        {props.nbrColorInt &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Nombre Couleur :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.nbrColorInt}</td>

                                                                </tr>

                                                            </>}


                                                        {props.formatCover &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article">
                                                                        <b>Format (Couverture) : </b>
                                                                    </td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.formatCover.contenu}</td>

                                                                </tr>

                                                            </>}
                                                        {props.papierCover &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Type de Papier (Couverture) :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.papierCover.contenu}</td>

                                                                </tr>

                                                            </>}
                                                        {props.nbrColorCover &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Nombre Couleur (couverture) :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.nbrColorCover}</td>

                                                                </tr>

                                                            </>}
                                                        {props.impression.length !== 0 &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Impression :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.impression.contenu}</td>
                                                                </tr>

                                                            </>}
                                                        {props.finition.length !== 0 &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Finition :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.finition.contenu}</td>

                                                                </tr>

                                                            </>}
                                                        {props.faconnage.length !== 0 &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Façonnage :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.faconnage.contenu}</td>

                                                                </tr>

                                                            </>}
                                                        {props.pieds &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Pieds :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.pieds}</td>

                                                                </tr>

                                                            </>}
                                                        {props.reference &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Reference :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.reference}</td>

                                                                </tr>

                                                            </>}
                                                        {props.color &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Couleur :</b></td>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">{props.color}</td>

                                                                </tr>
                                                                {/* <tr>
                                                                    <td height="1" colSpan="4" style={{ borderBottom: "1px solid #e4e4e4" }}></td>
                                                                </tr> */}
                                                            </>}


                                                        {props.qt.length > 0 &&
                                                            <>
                                                                <tr>
                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "rgb(0,0,0)", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} className="article"><b>Quantité :</b></td>


                                                                    <td style={{ fontSize: "14px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "18px", verticalAlign: "top", padding: "10px 0" }} align="left">
                                                                        {props.qt.map((q, i) => {
                                                                            return (<span>{q} Pieces {i < props.qt.length - 1 && (<span> / </span>)}</span>
                                                                            )
                                                                        })}

                                                                    </td>
                                                                </tr>
                                                                {/* <tr>
                                                                    <td height="1" colSpan="4" style={{ borderBottom: "1px solid #e4e4e4" }}></td>
                                                                </tr> */}
                                                            </>}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="20"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>)}




            <table width="100%" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#e1e1e1">

                <tr>
                    <td>
                        <table width="600" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullTable" bgcolor="#ffffff" style={{ borderRadius: "0 0 10px 10px" }}>
                            <tr className="hiddenMobile">
                                <td height="40"></td>
                            </tr>
                            <tr className="visibleMobile">
                                <td height="30"></td>
                            </tr>

                            <tr>
                                <td>
                                    <table width="480" border="0" cellPadding="0" cellSpacing="0" align="center" className="fullPadding">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table width="480" border="0" cellPadding="0" cellSpacing="0" align="left" className="col">
                                                        <tbody>


                                                            <tr>
                                                                <td style={{ fontSize: "14px", color: "#5b5b5b", fontFamily: "'Open Sans', sans-serif", lineHeight: "18px", verticalAlign: "top", textAlign: "left" }}>
                                                                    Merci de me faire parvenir votre offre dans les plus brefs délais.

                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ fontSize: "14px", color: "#5b5b5b", fontFamily: "'Open Sans', sans-serif", lineHeight: "18px", verticalAlign: "top", textAlign: "left" }}>
                                                                    Cordialement,
                                                                    <br />
                                                                    <br />
                                                                    <b style={{ fontSize: "14px", color: "rgba(0,0,0)" }}>Mehdi Jelliti</b>
                                                                </td>

                                                            </tr>

                                                        </tbody>
                                                    </table>

                                                </td>
                                            </tr>
                                            <tr className="spacer">
                                                <td height="50"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="20"></td>
                </tr>
            </table>

            {/* animationn <div style={props.active ? { opacity: "0" } : { opacity: "1" }} className="container">
                <div className="animation">
                    <div className="i-mail">
                        <div className="mail-anim"></div>
                    </div>
                    <div className="line"></div>
                    <div className="i-success">
                        <div className="success-anim"></div>
                    </div>

                </div>
                <div className="message">
                    Your message has been sent successfully

                </div>
</div>*/}



            <a style={props.active ? { opacity: "0" } : { opacity: "1" }} className="send" >
                <i className="sending material-icons">send</i>
                <i className="sent material-icons">send</i>
                <i className="confirm material-icons">check</i>
            </a>
        </div>
    )
}

export default Mail;