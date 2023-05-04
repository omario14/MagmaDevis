import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';
import './App.css'
import './App.scss'
import { fournisseursData } from "./fournisseur";
import { supportData, formatData, papierInterieur, papierCouverture, finitionData, faconnageData, impressionData } from "./support";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Mail from './MailPreview/Mail';
import "./MailPreview/MailPreview.scss"
import ReactDOMServer from 'react-dom/server';
function App() {
  const [support, setSupport] = useState('');
  const [fournisseur, setFournisseur] = useState('');
  const [fournisseurs, setFournisseurs] = useState([]);
  const [format, setFormat] = useState('');
  const [formatCover, setFormatCover] = useState('');
  const [impression, setImpression] = useState('');
  const [finition, setFinition] = useState('');
  const [pieds, setPieds] = useState('');
  const [papierInter, setPapierInter] = useState('');
  const [papierCover, setPapierCover] = useState('');
  const [reference, setReference] = useState('');
  const [color, setColor] = useState('');
  const [nbrColorInt, setNbrColorInt] = useState('');
  const [nbrColorCover, setNbrColorCover] = useState('');
  const [faconnage, setFaconnage] = useState('');
  const [autres, setAutres] = useState({
    nom: "",
    contenu: ""
  });
  const [num, setNum] = useState(0);
  const [qts, setQts] = useState([1]);
  const [active, setActive] = useState(true);

  const sendEmail = (e) => {
    e.preventDefault();
    setActive(!active);
    if (fournisseur) {
      const templateParams = {
        email: fournisseur.email,
        my_html: ReactDOMServer.renderToString(<Mail
          produit={support}
          format={format}
          formatCover={formatCover}
          typePapier={papierInter}
          papierCover={papierCover}
          impression={impression}
          finition={finition}
          pieds={pieds}
          reference={reference}
          autres={autres}
          color={color}
          nbrColorInt={nbrColorInt}
          nbrColorCover={nbrColorCover}
          faconnage={faconnage}
          nbrPage={num}
          qt={qts}
          active={active}
        />)
      };

      emailjs.send('service_yi9x66n', 'template_tn4wg88', templateParams, 'jqm4okl98h-Qa48IQ')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
      setTimeout(function () {
        window.location.reload();
      }, 3000);

    };
  }

    const handleSupport = (e) => {
      const selectedValue = e.target.value;
      setSupport(JSON.parse(selectedValue));

    }

    const onChangeFournisseur = (e) => {
      setFournisseur(fournisseursData[e.target.value]);
      setQts([1]);

    }
    const onChangeFormat = (e) => {
      const selectedValue = e.target.value;
      setFormat(JSON.parse(selectedValue));
      /**when add item to summary 
       addItemHandler(i[0], "Format");**/
    }
    const onChangeTypePapier = (e) => {
      setPapierInter(JSON.parse(e.target.value))
      /**when add item to summary 
     addItemHandler(i[0], "Papier Interieur");**/
    }
    const onChangeNum = (e) => {
      setNum(e.target.value);
    }
    let incNum = () => {
      if (num < 10) {
        setNum(Number(num) + 1);
      }
    }
    let decNum = () => {
      if (num > 1) {
        setNum(num - 1);
      }
    }


    const addInput = () => {
      setQts([...qts, 1]);
    }
    const removeInput = (index) => {
      const updatedList = [...qts];
      updatedList.splice(index, 1);
      setQts(updatedList);

    }




    useEffect(() => {

      setSupport('');

    }, [fournisseur])


    useEffect(() => {
      setFournisseurs(fournisseursData);
      const script = document.createElement('script');
      script.src = "../assets/js/functions_no_side_panel.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      }
    }, []);


    return (
      <div className="App">
        <div id="loader_form">
          <div data-loader="circle-side-2"></div>
        </div>
        <div id="main_container" className="visible">
          <div id="header_in">
            <div id="logo_in"><img src="../assets/img/logo_black.png" width="160" height="48" data-retina="true" alt="Quote" /></div>
          </div>
          <div className="wrapper_in">
            <div className="container-fluid">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab_1">
                  <div className="subheader" id="quote"></div>
                  <div className="row">
                    {!fournisseur ?
                      (<aside className="col-xl-3 col-lg-4">
                        <h2>Demandez un devis et comparez les prix ! </h2>
                        <p className="lead">Trouver la meilleure offre pour le produit ou le service que vous recherchez.</p>
                        <ul className="list_ok">
                          <li>Économisez du temps et de l'argent.</li>
                          <li>Trouvez rapidement les meilleures offres.</li>
                          <li>Une interface ergonomique et facile à utiliser.</li>
                        </ul>
                      </aside>)
                      :
                      (<aside className="col-xl-3 col-lg-4">
                        <div >
                          <h2>{fournisseur.name}</h2>
                          <ul className="list_ok">
                            <li><span style={{ fontWeight: "bold" }}>Email : </span>{fournisseur.email}</li>
                            {/* <li><span style={{ fontWeight: "bold" }}>Tel : </span>{data.tel}</li>
                              <li><span style={{ fontWeight: "bold" }}>Address : </span>{data.address}</li> */}
                          </ul>
                        </div>




                      </aside>)}

                    <div className="col-xl-9 col-lg-8">
                      <div id="wizard_container">
                        <div id="top-wizard">
                          <strong>Progress</strong>
                          <div id="progressbar"></div>
                        </div>

                        <form name="example-1" id="wrapped" onSubmit={sendEmail}>

                          <input id="website" name="website"  type="text" defaultValue="" />
                          <div id="middle-wizard">
                            <div className="step" >
                              <h3 className="main_question"><strong>1/3</strong>Sélectionnez le fournisseur idéal pour votre projet?</h3>

                              {fournisseurs && fournisseurs.map((f, key) => {
                                return (
                                  <div key={key} className="form-group radio_questions">
                                    <div className="radio">
                                      <input type="radio" style={{ marginRight: "10px" }} className=" required" name="question_1" value={key} onChange={onChangeFournisseur} />
                                      <input id={f.id} type="radio" style={{ marginRight: "10px" }} className=" " name="question_1" value={key} onChange={onChangeFournisseur} />
                                      <label htmlFor={f.id} className="radio-label">{f.id}. {f.name}</label>
                                    </div>

                                  </div>
                                )
                              })}
                            </div>

                            <div className="step">

                              <h3 className="main_question"><strong>2/3</strong>Sélectionnez votre projet:</h3>

                              <div className="row">

                                <div className="col-lg-10">
                                  <div className="form-group select">
                                    <label>Support: </label>
                                    <div className="styled-select">
                                      <select value={JSON.stringify(support)} className="required" name="select_1" onChange={handleSupport}>
                                        <option value=""  >Select</option>
                                        {supportData && fournisseur && supportData.filter((item) => (item.id.substring(0, item.id.indexOf('-')) === fournisseur.keyword)).map((s, key) => {
                                          return (
                                            <option key={key} value={JSON.stringify(s)}>{s.name}</option>
                                          )
                                        })}

                                      </select>
                                    </div>

                                  </div>
                                  {support && (support.name.toLowerCase() === 'autres' && support.id.substring(0, support.id.indexOf('-')) !== 'sbcd') ?

                                    <>
                                      <input type="text" name="select_1" className="required form-control" placeholder="Nom de Produit" onChange={e => {
                                        setAutres({
                                          ...autres,
                                          nom: e.target.value
                                        });
                                      }} />
                                      <textarea id="autres" className="required form-control" style={{ height: "102px" }} name="autres"
                                        rows="5" cols="33" placeholder='Parlez-nous de votre produit...' onChange={e => {
                                          setAutres({
                                            ...autres,
                                            contenu: e.target.value
                                          });
                                        }}>

                                      </textarea>

                                    </>
                                    :
                                    <div>
                                      {support &&
                                        (
                                          ((support.id.substring(0, support.id.indexOf('-')) === 'xlduo' || support.id.substring(0, support.id.indexOf('-')) === 'skyflag' || support.id.substring(0, support.id.indexOf('-')) === 'simpfoc') && (support.name.toLowerCase() !== "winflag")) &&
                                          (<div className="form-group select">
                                            <label>Format: </label>
                                            <div className="styled-select">

                                              <select value={JSON.stringify(format)} className="required" name="select_3" onChange={onChangeFormat}>
                                                <option value="" >Select</option>
                                                {formatData && support && formatData.filter((item) => (item.id.substring(0, item.id.indexOf('-')) === support.id.substring(0, support.id.indexOf('-')))).map((s, key) => {
                                                  return (
                                                    <option key={key} value={JSON.stringify(s)}>{s.contenu}</option>
                                                  )
                                                })}
                                              </select>


                                            </div>
                                          </div>)

                                        )
                                      }
                                      {support && (["x-displays", "roll up", "rollup one.r800", "banderole", "winflag"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Impression :</label>
                                          <div className="styled-select">

                                            <select value={JSON.stringify(impression)} className="required" name="impression" onChange={e => { setImpression(JSON.parse(e.target.value)) }}>
                                              <option value="" >Select</option>
                                              {impressionData && impressionData.map((i, key) => {
                                                return (
                                                  <option key={key} value={JSON.stringify(i)} >{i.contenu}</option>
                                                )
                                              })}
                                            </select>
                                          </div>
                                        </div>
                                      }
                                      {support && (["x-displays", "roll up", "rollup one.r800", "banderole", "winflag"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Quantité :  </label>
                                          <div className="form-group">
                                            <div className="text-center mb-5">
                                              <button type="button" onClick={addInput} name="addQuantity" className="btn btn-secondary" >Ajouter Quantité   <i className="fa fa-plus" aria-hidden="true"></i> </button>
                                            </div>
                                            {qts.map((qt, index) => (
                                              <div className="d-flex" >
                                                <div className="number-input-container " >
                                                  <button
                                                    type="button"
                                                    className="button-decrement"
                                                    onClick={() => {
                                                      const newInputs = [...qts];

                                                      if (newInputs[index] > 1) {
                                                        newInputs[index] = newInputs[index] - 1
                                                        setQts(newInputs);
                                                      }
                                                    }}
                                                    data-input-id="hue"
                                                    data-operation="decrement"
                                                  ></button>
                                                  <div className="number-input">
                                                    <input onFocus={event => event.target.select()} type="number" value={qt} name="quantite" className="required form-control" placeholder="Pages"
                                                      onChange={e => {
                                                        const newInputs = [...qts];
                                                        newInputs[index] = e.target.value;
                                                        setQts(newInputs);
                                                      }} />
                                                  </div>
                                                  <button
                                                    type="button"
                                                    className="button-increment"
                                                    onClick={() => {
                                                      const newInputs = [...qts];

                                                      if (newInputs[index] < 10000) {
                                                        newInputs[index] = newInputs[index] + 1
                                                        setQts(newInputs);
                                                      }
                                                    }}
                                                    data-input-id="saturation"
                                                    data-operation="increment"
                                                  ></button>
                                                </div>

                                                <a href="#!" onClick={() => removeInput(index)} className={qts.length > 1 ? 'm-2' : 'm-2 disabled'} >
                                                  <i className="fa fa-times-circle"></i>
                                                </a>

                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      }
                                      {support && (["banderole", "winflag"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Finitions :</label>
                                          <div className="styled-select">
                                            <select value={JSON.stringify(finition)} className="required" name="finition" onChange={e => { setFinition(JSON.parse(e.target.value)) }}>
                                              <option value="" selected>Select</option>

                                              <option value={JSON.stringify({ id: "id0", contenu: "4 Oeillets" })} >4 Oeillets</option>

                                            </select>
                                          </div>
                                        </div>
                                      }
                                      {support && (["winflag"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Pieds :</label>
                                          <div className="styled-select">
                                            <select className="required" name="pieds" onChange={e => { setPieds(e.target.value) }}>
                                              <option defaultValue="" selected>Select</option>
                                              <option value="Pied platine 7,5 kg Idéal pour sols durs" >Pied platine 7,5 kg Idéal pour sols durs</option>
                                              <option value="Pied parasol 17 L" >Pied parasol 17 L</option>
                                              <option value="Pied Forant à visser, terre, neige ou sable" >Pied Forant à visser, terre, neige ou sable</option>
                                            </select>
                                          </div>
                                        </div>
                                      }
                                      {support && (["winflag"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Format :</label>
                                          <div className="styled-select">
                                            <select className="required" name="format" onChange={onChangeFormat}>
                                              <option value="" selected>Select</option>
                                              <option value="2M30" >2M30</option>
                                              <option value="3M50" >3M50</option>
                                              <option value="4M80" >4M80</option>
                                              <option value="6M50" >6M50</option>
                                            </select>
                                          </div>
                                        </div>
                                      }
                                      {support && (["stylo", "clé usb", "autre produit"].some(item => support.name.toLowerCase() === item)) &&
                                        <div>
                                          {support.name.toLowerCase() === "autre produit" &&
                                            <div className="form-group select">
                                              <label>Nom de Produit : </label>
                                              <input type="text" name="select_1" className="required form-control" placeholder="Nom de Produit" onChange={e => {
                                                setAutres({
                                                  ...autres,
                                                  nom: e.target.value
                                                });
                                              }} />
                                            </div>
                                          }
                                          <div className="row">

                                            <div className="col-sm-6">
                                              <label>Reference : </label>
                                              <div className="form-group">
                                                <input type="text" name="Reference" className="required form-control" placeholder="#B1512" onChange={e => { setReference(e.target.value) }} />
                                              </div>
                                            </div>

                                            <div className="col-sm-6">
                                              <label>Couleur : </label>
                                              <div className="form-group">
                                                <input type="text" name="color" className="required form-control" placeholder="Couleur" onChange={e => { setColor(e.target.value) }} />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-group select">
                                            <label>Quantité : </label>
                                            <div className="form-group">
                                              <div className="text-center mb-5">
                                                <button type="button" onClick={addInput} name="addQuantity" className="btn btn-secondary" >Ajouter Quantité   <i className="fa fa-plus" aria-hidden="true"></i> </button>
                                              </div>
                                              {qts.map((qt, index) => (
                                                <div className="d-flex" >
                                                  <div className="number-input-container " >
                                                    <button
                                                      type="button"
                                                      className="button-decrement"
                                                      onClick={() => {
                                                        const newInputs = [...qts];

                                                        if (newInputs[index] > 1) {
                                                          newInputs[index] = newInputs[index] - 1
                                                          setQts(newInputs);
                                                        }
                                                      }}
                                                      data-input-id="hue"
                                                      data-operation="decrement"
                                                    ></button>
                                                    <div className="number-input">
                                                      <input onFocus={event => event.target.select()} type="number" value={qt} name="quantite" className="required form-control" placeholder="Pages"
                                                        onChange={e => {
                                                          const newInputs = [...qts];
                                                          newInputs[index] = e.target.value;
                                                          setQts(newInputs);
                                                        }} />
                                                    </div>
                                                    <button
                                                      type="button"
                                                      className="button-increment"
                                                      onClick={() => {
                                                        const newInputs = [...qts];

                                                        if (newInputs[index] < 10000) {
                                                          newInputs[index] = newInputs[index] + 1
                                                          setQts(newInputs);
                                                        }
                                                      }}
                                                      data-input-id="saturation"
                                                      data-operation="increment"
                                                    ></button>
                                                  </div>

                                                  <a href="#!" onClick={() => removeInput(index)} className={qts.length > 1 ? 'm-2' : 'm-2 disabled'} >
                                                    <i className="fa fa-times-circle"></i>
                                                  </a>

                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      }
                                      {support && (["livres", "brochures", "catalogues", "affiches", "carte de visite", "flyer", "dépliant 2 volets", "dépliant 3 volets", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Type de papier :</label>
                                          <div className="styled-select">
                                            <select value={JSON.stringify(papierInter)} className="required" name="select_2" onChange={onChangeTypePapier}>
                                              <option value="" >Select</option>
                                              {papierInterieur && papierInterieur.map((p, key) => {

                                                return (
                                                  <option key={key} value={JSON.stringify(p)} >{p.contenu}</option>
                                                )
                                              })}
                                            </select>
                                          </div>
                                        </div>
                                      }
                                      {support && (["livres", "brochures", "catalogues", "affiches", "carte de visite", "flyer", "dépliant 2 volets", "dépliant 3 volets", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Nombre de Couleur <img src="../assets/img/iconcolorpalette.png" className='m-0 p-0' width={20} /> </label>
                                          <div className="styled-select">
                                            <select className="required" name="select_4" onChange={e => { setNbrColorInt(e.target.value) }}>
                                              <option value="" selected>Select</option>
                                              <option value="1 Couleur">1 Couleur</option>
                                              <option value="2 Couleurs">2 Couleurs</option>
                                              <option value="4 Couleurs">4 Couleurs</option>
                                              <option value="5 Couleurs">5 Couleurs</option>
                                            </select>
                                          </div>
                                        </div>
                                      }


                                      {support && (["livres", "brochures", "catalogues", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">

                                          <div className="row">

                                            <div className="col-sm-6">
                                              <label>Nombre de Page : </label>
                                              <div className="form-group">
                                                <div className="number-input-container">
                                                  <button
                                                    type="button"
                                                    className="button-decrement"
                                                    onClick={decNum}
                                                    data-input-id="hue"
                                                    data-operation="decrement"
                                                  ></button>
                                                  <div className="number-input">
                                                    <input type="number" onFocus={event => event.target.select()} value={num} name="nbrPage" className="required form-control" placeholder="Pages" onChange={onChangeNum} />
                                                  </div>
                                                  <button
                                                    type="button"
                                                    className="button-increment"
                                                    onClick={incNum}
                                                    data-input-id="saturation"
                                                    data-operation="increment"
                                                  ></button>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="col-sm-6">
                                              <label>Type de Papier (couverture) : </label>
                                              <div className="styled-select">
                                                <select value={JSON.stringify(papierCover)} className="required" name="select_5" onChange={e => { setPapierCover(JSON.parse(e.target.value)) }}>
                                                  <option value="" >Select</option>
                                                  {papierCouverture && papierCouverture.map((p, key) => {
                                                    return (
                                                      <option key={key} value={JSON.stringify(p)}>{p.contenu}</option>
                                                    )
                                                  })}

                                                </select>
                                              </div>
                                            </div>
                                          </div>



                                        </div>
                                      }

                                      {support && (["livres", "brochures", "catalogues", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <div className="row">
                                            <div className="col-sm-6">
                                              <div className="form-group select">
                                                <label>Format (couverture) : </label>
                                                <div className="styled-select">
                                                  <select value={JSON.stringify(formatCover)} className="required" name="select_6" onChange={e => { setFormatCover(JSON.parse(e.target.value)) }}>
                                                    <option value="" >Select</option>
                                                    {formatData && support && formatData.filter((item) => (item.id.substring(0, item.id.indexOf('-')) === support.id.substring(0, support.id.indexOf('-')))).map((s, key) => {
                                                      return (
                                                        <option key={key} value={JSON.stringify(s)}>{s.contenu}</option>
                                                      )
                                                    })}
                                                  </select>


                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <label>Nombre de Couleur <img src="../assets/img/iconcolorpalette.png" className='m-0 p-0' width={20} /> (couverture) : </label>
                                              <div className="styled-select">
                                                <select className="required" name="select_7" onChange={e => { setNbrColorCover(e.target.value) }}>
                                                  <option value="" selected>Select</option>
                                                  <option value="1 Couleur">1 Couleur</option>
                                                  <option value="2 Couleurs">2 Couleurs</option>
                                                  <option value="4 Couleurs">4 Couleurs</option>
                                                  <option value="5 Couleurs">5 Couleurs</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      }
                                      {support && (["livres", "brochures", "catalogues", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Façonnage : </label>
                                          <div className="styled-select">
                                            <select value={JSON.stringify(faconnage)} className="" name="select_8" onChange={e => { setFaconnage(JSON.parse(e.target.value)) }}>
                                              <option value="" >Select</option>
                                              {faconnageData && faconnageData.map((f, key) => {
                                                return (
                                                  <option key={key} value={JSON.stringify(f)}>{f.contenu}</option>
                                                )
                                              })}
                                            </select>
                                          </div>
                                        </div>
                                      }

                                      {support && (["livres", "brochures", "affiches", "catalogues", "carte de visite", "flyer", "dépliant 2 volets", "dépliant 3 volets", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div>
                                          <div className="form-group select">


                                            <label>Finition : </label>
                                            <div className="styled-select">
                                              <select value={JSON.stringify(finition)} name="select_9" onChange={e => { setFinition(JSON.parse(e.target.value)) }}>
                                                <option value="" >Select</option>
                                                {finitionData && finitionData.map((f, key) => {
                                                  return (
                                                    <option key={key} value={JSON.stringify(f)}>{f.contenu}</option>
                                                  )
                                                })}
                                              </select>
                                            </div>
                                          </div>

                                          <div className="form-group select">
                                            <label>Quantité : </label>
                                            <div className="form-group">
                                              <div className="text-center mb-5">
                                                <button type="button" onClick={addInput} name="addQuantity" className="btn btn-secondary" >Ajouter Quantité   <i className="fa fa-plus" aria-hidden="true"></i> </button>
                                              </div>
                                              {qts.map((qt, index) => (
                                                <div className="d-flex" >
                                                  <div className="number-input-container " >
                                                    <button
                                                      type="button"
                                                      className="button-decrement"
                                                      onClick={() => {
                                                        const newInputs = [...qts];

                                                        if (newInputs[index] > 1) {
                                                          newInputs[index] = newInputs[index] - 1
                                                          setQts(newInputs);
                                                        }
                                                      }}
                                                      data-input-id="hue"
                                                      data-operation="decrement"
                                                    ></button>
                                                    <div className="number-input">
                                                      <input onFocus={event => event.target.select()} type="number" value={qt} name="quantite" className="required form-control" placeholder="Pages"
                                                        onChange={e => {
                                                          const newInputs = [...qts];
                                                          newInputs[index] = e.target.value;
                                                          setQts(newInputs);
                                                        }} />
                                                    </div>
                                                    <button
                                                      type="button"
                                                      className="button-increment"
                                                      onClick={() => {
                                                        const newInputs = [...qts];

                                                        if (newInputs[index] < 10000) {
                                                          newInputs[index] = newInputs[index] + 1
                                                          setQts(newInputs);
                                                        }
                                                      }}
                                                      data-input-id="saturation"
                                                      data-operation="increment"
                                                    ></button>
                                                  </div>

                                                  <a href="#!" onClick={() => removeInput(index)} className={qts.length > 1 ? 'm-2' : 'm-2 disabled'} >
                                                    <i className="fa fa-times-circle"></i>
                                                  </a>

                                                </div>
                                              ))}
                                            </div>

                                          </div>
                                        </div>
                                      }

                                    </div>
                                  }
                                </div>
                              </div>
                            </div>



                            <div className="submit step">
                              <div className={active ? "compose" : "compose  active"}>
                                <h3 className="main_question"><strong>3/3</strong>Aperçu :</h3>
                                
                                <Mail
                                  produit={support}
                                  format={format}
                                  formatCover={formatCover}
                                  typePapier={papierInter}
                                  papierCover={papierCover}
                                  impression={impression}
                                  finition={finition}
                                  pieds={pieds}
                                  reference={reference}
                                  autres={autres}
                                  color={color}
                                  nbrColorInt={nbrColorInt}
                                  nbrColorCover={nbrColorCover}
                                  faconnage={faconnage}
                                  nbrPage={num}
                                  qt={qts}
                                  active={active}

                                />

                              </div>
                            </div>
                          </div>
                          <div id="bottom-wizard">
                            <button type="button" disabled={!active} name="backward" className="backward">Precedent </button>
                            <button type="button" name="forward" className="forward">Suivant</button>
                            <button type="submit" disabled={!active} name="process" className="submit envoyer" >Envoyer
                            </button>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>




              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

  export default App
