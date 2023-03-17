import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';
import './App.css'
import './App.scss'
import { fournisseursData } from "./fournisseur";
import { supportData, formatData, papierInterieur, papierCouverture, finitionData, faconnageData, impressionData } from "./support";
import '../node_modules/font-awesome/css/font-awesome.min.css';

function App() {
  const [open, setOpen] = useState(false);
  const [support, setSupport] = useState('');
  const [fournisseur, setFournisseur] = useState('');
  const [fournisseurs, setFournisseurs] = useState([]);
  const [num, setNum] = useState(1);
  const [qt, setQt] = useState(1);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_3ese5z6', e.target, 'user_PGXC8IvmNYbSPd1Lk1gAy')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  const handleSupport = (e) => {
    const i = supportData.filter((item) => { return item.id === e.target.value })
    setSupport(i[0]);




  }
  const onChangeFournisseur = (e) => {
    setFournisseur(fournisseursData[e.target.value]);
    setSupport('');
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
  const onChangeQuantite = (e) => {
    setQt(e.target.value);
  }
  let incQt = () => {
    if (qt < 10) {
      setQt(Number(qt) + 1);
    }
  }
  let decQt = () => {
    if (qt > 1) {
      setQt(qt - 1);
    }
  }

  useEffect(() => {
    setFournisseurs(fournisseursData);
    const script = document.createElement('script');
    script.src = "./src/assets/js/functions_no_side_panel.js";
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

      <header>
        <a id="menu-button-mobile" className="cmn-toggle-switch cmn-toggle-switch__htx" href="#!"><span>Menu mobile</span></a>
        <nav className="main_nav">
          <ul className="nav nav-tabs">
            <li><a href="#tab_1" data-toggle="tab" className="active show">Request a quote</a></li>
            <li><a href="#tab_2" data-toggle="tab">About</a></li>
            <li><a href="#tab_3" data-toggle="tab">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div id="main_container" className="visible">

        <div id="header_in">
          <div id="logo_in"><img src="./src/assets/img/logo_black.png" width="160" height="48" data-retina="true" alt="Quote" /></div>
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
                        <p className="lead">Contact :</p>
                        <ul className="list_ok">
                          <li><span style={{ fontWeight: "bold" }}>Email : </span>{fournisseur.email}</li>
                          {/* <li><span style={{ fontWeight: "bold" }}>Tel : </span>{data.tel}</li>
                              <li><span style={{ fontWeight: "bold" }}>Address : </span>{data.address}</li> */}

                        </ul>
                      </div>
                      <div className="summary_invoice">

                        <p className="lead mt-4">Summary :</p>
                        <ul id="orderSumList">
                          <li id="optionGroup1Sum">
                            <a href="#!" id="optionGroup1SumReset">
                              <i class="fa fa-times-circle"></i>
                            </a>
                            Carte Visite
                            <span class="price">52 DT</span>
                          </li>
                          <li id="optionGroup1Sum">
                            <a href="#!" id="optionGroup1SumReset">
                              <i class="fa fa-times-circle"></i>
                            </a>
                            Recto * Verso
                            <span class="price">10 DT</span>
                          </li>
                          <li id="optionGroup2Sum"></li>
                          <li id="optionGroup3Sum"></li>
                          <li id="extraOption1Sum"></li>
                          <li id="extraOption2Sum"></li>
                        </ul>
                        <div className="row total-container">
                          <div className="col-6 p-0">
                            <span type="text" id="totalTitle" className="summaryInput" name="totallabel" value="" disabled >TOTAL</span>
                          </div>
                          <div className="col-6 p-0">
                            <span type="text" id="total" className="summaryInput" name="total" value="0"> 60 DT</span>

                          </div>
                        </div>
                      </div>



                    </aside>)}

                  <div className="col-xl-9 col-lg-8">
                    <div id="wizard_container">
                      <div id="top-wizard">
                        <strong>Progress</strong>
                        <div id="progressbar"></div>
                      </div>

                      <form name="example-1" id="wrapped" onSubmit={sendEmail}>
                        <input id="website" name="website" type="text" defaultValue="" />
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
                                    <select className="required" name="select_1" onChange={handleSupport}>
                                      <option defaultValue=""  >Select</option>
                                      {supportData && fournisseur && supportData.filter((item) => (item.id.substring(0, item.id.indexOf('-')) === fournisseur.keyword)).map((s, key) => {
                                        return (
                                          <option key={key} value={s.id}>{s.name}</option>
                                        )
                                      })}

                                    </select>
                                  </div>
                                </div>
                                {support && support.name.toLowerCase() === 'autres' ?
                                  <textarea id="autres" className="required form-control" style={{height:"102px"}} name="autres"
                                    rows="5" cols="33" placeholder='Parlez-nous de votre produit...'>
                                    
                                  </textarea>
                                  :
                                  <div>
                                    {support &&
                                      (
                                        ((support.id.substring(0, support.id.indexOf('-')) === 'xlduosky' || support.id.substring(0, support.id.indexOf('-')) === 'simpfoc') && (support.name.toLowerCase() !== "winflag")) &&
                                        (<div className="form-group select">
                                          <label>Format: </label>
                                          <div className="styled-select">

                                            <select className="required" name="select_3">
                                              <option value="" selected>Select</option>
                                              {formatData && support && formatData.filter((item) => (item.id.substring(0, item.id.indexOf('-')) === support.id.substring(0, support.id.indexOf('-')))).map((s, key) => {
                                                return (
                                                  <option key={key} value={s.id}>{s.contenu}</option>
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
                                          <select className="required" name="impression">
                                            <option value="" selected>Select</option>
                                            {impressionData && impressionData.map((i, key) => {

                                              return (
                                                <option key={key} value={i.contenu} >{i.contenu}</option>
                                              )
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                    }
                                    {support && (["x-displays", "roll up", "rollup one.r800", "banderole", "winflag"].some(item => support.name.toLowerCase() === item)) &&
                                      <div className="form-group select">
                                        <label>Quantité : </label>
                                              <div className="form-group">
                                                <div class="number-input-container">
                                                  <button
                                                    type="button"
                                                    class="button-decrement"
                                                    onClick={decQt}
                                                    data-input-id="hue"
                                                    data-operation="decrement"
                                                  ></button>
                                                  <div class="number-input">
                                                    <input type="number" value={qt} name="quantite" className="required form-control" placeholder="Pages" onChange={onChangeQuantite} />
                                                  </div>
                                                  <button
                                                    type="button"
                                                    class="button-increment"
                                                    onClick={incQt}
                                                    data-input-id="saturation"
                                                    data-operation="increment"
                                                  ></button>
                                                </div>
                                              </div>
                                      </div>
                                    }
                                    {support && (["banderole", "winflag"].some(item => support.name.toLowerCase() === item)) &&
                                      <div className="form-group select">
                                        <label>Finitions :</label>
                                        <div className="styled-select">
                                          <select className="required" name="finition">
                                            <option value="" selected>Select</option>
                                            
                                                <option value="4 Oeillets" >4 Oeillets</option>
                                           
                                          </select>
                                        </div>
                                      </div>
                                    }
                                    {support && (["banderole", "winflag"].some(item => support.name.toLowerCase() === item)) &&
                                      <div className="form-group select">
                                        <label>Pieds :</label>
                                        <div className="styled-select">
                                          <select className="required" name="pieds">
                                            <option value="" selected>Select</option>
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
                                          <select className="required" name="pieds">
                                            <option value="" selected>Select</option>
                                                <option value="2M30" >2M30</option>
                                                <option value="3M50" >3M50</option>
                                                <option value="4M80" >4M80</option>                                      
                                                <option value="6M50" >6M50</option>                                      
                                          </select>
                                        </div>
                                      </div>
                                    }
                                    {support && (["livres", "brochures", "catalogues", "affiches", "carte de visite", "flyer", "dépliant 2 volets", "dépliant 3 volets", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                      <div className="form-group select">
                                        <label>Type de papier :</label>
                                        <div className="styled-select">
                                          <select className="required" name="select_2">
                                            <option value="" selected>Select</option>
                                            {papierInterieur && papierInterieur.map((p, key) => {

                                              return (
                                                <option key={key} value={p.contenu} >{p.contenu}</option>
                                              )
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                    }
                                    {support && (["livres", "brochures", "catalogues", "affiches", "carte de visite", "flyer", "dépliant 2 volets", "dépliant 3 volets", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                      <div className="form-group select">
                                        <label>Nombre de Couleur <img src="src/assets/img/iconcolorpalette.png" className='m-0 p-0' width={20} /> </label>
                                        <div className="styled-select">
                                          <select className="required" name="select_4">
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
                                              <div class="number-input-container">
                                                <button
                                                  type="button"
                                                  class="button-decrement"
                                                  onClick={decNum}
                                                  data-input-id="hue"
                                                  data-operation="decrement"
                                                ></button>
                                                <div class="number-input">
                                                  <input type="number" value={num} name="nbrPage" className="required form-control" placeholder="Pages" onChange={onChangeNum} />
                                                </div>
                                                <button
                                                  type="button"
                                                  class="button-increment"
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
                                              <select className="required" name="select_5">
                                                <option value="" selected>Select</option>
                                                {papierCouverture && papierCouverture.map((p, key) => {
                                                  return (
                                                    <option key={key} value={p}>{p.contenu}</option>
                                                  )
                                                })}

                                              </select>
                                            </div>
                                          </div>
                                        </div>

                                        <div  className="row">
                                          <img onClick={(e) => { e.preventDefault(), setOpen(!open) }} className={open ? "shift " : "rot"} src="./src/assets/img/shift.png" />
                                        </div>

                                      </div>
                                    }
                                    <div className={open ? "panel-collapse" : "panel-collapse panel-close"} >
                                      
                                      {support && (["livres", "brochures", "catalogues", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">

                                          <div className="row">
                                            <div className="col-sm-6">
                                              <div className="form-group select">
                                                <label>Format (couverture) : </label>
                                                <div className="styled-select">
                                                  {support.name.toLowerCase() === 'autres' ?
                                                    <input type="text" name="autres" className="required form-control" placeholder="Autres" />
                                                    :

                                                    <select className="required" name="select_6">
                                                      <option value="" selected>Select</option>
                                                      {formatData && support && formatData.filter((item) => (item.id.substring(0, item.id.indexOf('-')) === support.id.substring(0, support.id.indexOf('-')))).map((s, key) => {
                                                        return (
                                                          <option key={key} value={s.id}>{s.contenu}</option>
                                                        )
                                                      })}
                                                    </select>
                                                  }

                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <label>Nombre de Couleur <img src="src/assets/img/iconcolorpalette.png" className='m-0 p-0' width={20} /> (couverture) : </label>
                                              <div className="styled-select">
                                                <select className="required" name="select_7">
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
                                      {support && (["livres", "brochures", "catalogues", "carte de visite", "flyer", "dépliant 2 volets", "dépliant 3 volets", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <label>Façonnage : </label>
                                          <div className="styled-select">
                                            <select className="required" name="select_8">
                                              <option value="" selected>Select</option>
                                              {faconnageData && faconnageData.map((f, key) => {
                                                return (
                                                  <option key={key} value={f}>{f.contenu}</option>
                                                )
                                              })}
                                            </select>
                                          </div>
                                        </div>
                                      }

                                      {support && (["livres", "brochures", "catalogues", "notebook", "semainier"].some(item => support.name.toLowerCase() === item)) &&
                                        <div className="form-group select">
                                          <div className="row">
                                            <div className="col-sm-6">
                                              <label>Finition : </label>
                                              <div className="styled-select">
                                                <select className="required" name="select_9">
                                                  <option value="" selected>Select</option>
                                                  {finitionData && finitionData.map((f, key) => {
                                                    return (
                                                      <option key={key} value={f}>{f.contenu}</option>
                                                    )
                                                  })}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <label>Quantité : </label>
                                              <div className="form-group">
                                                <div class="number-input-container">
                                                  <button
                                                    type="button"
                                                    class="button-decrement"
                                                    onClick={decQt}
                                                    data-input-id="hue"
                                                    data-operation="decrement"
                                                  ></button>
                                                  <div class="number-input">
                                                    <input type="number" value={qt} name="quantite" className="required form-control" placeholder="Pages" onChange={onChangeQuantite} />
                                                  </div>
                                                  <button
                                                    type="button"
                                                    class="button-increment"
                                                    onClick={incQt}
                                                    data-input-id="saturation"
                                                    data-operation="increment"
                                                  ></button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      }

                                    </div>
                                  </div>

                                }
                              </div>
                            </div>
                          </div>

                          {/* <div className="step">
                            <h3 className="main_question"><strong>3/3</strong>Please answer the following questions:</h3>

                            <div className="row">

                              <div className="col-lg-10">
                                <div className="form-group select">
                                  <label>If you already have an hosting plan, please define:</label>
                                  <div className="styled-select">
                                    <select className="required" name="select_1">
                                      <option defaultValue="" selected>Select</option>
                                      <option defaultValue="Unix/Linux + Mysql">Unix/Linux + Mysql</option>
                                      <option defaultValue="Windows + Sql">Windows + Sql</option>
                                      <option defaultValue="Other">Other</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="form-group select">
                                  <label>If you need an hosting plan, please define which one:</label>
                                  <div className="styled-select">
                                    <select className="required" name="select_2">
                                      <option defaultValue="" selected>Select</option>
                                      <option defaultValue="Hosting Plan 1 year + Mysql database 500MB">1 year + Mysql database 500MB</option>
                                      <option defaultValue="Hosting Plan 2 year + Mysql database 500MB">2 year + Mysql database 500MB</option>
                                      <option defaultValue="Hosting Plan 2 year + Mysql database 1GB">2 year + Mysql database 1GB</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="form-group select">
                                  <label>If you need a newsletter campaign, please define the provider you prefer:</label>
                                  <div className="styled-select">
                                    <select className="required" name="select_3">
                                      <option defaultValue="" selected>Select</option>
                                      <option defaultValue="Mailchimp">Mailchimp</option>
                                      <option defaultValue="CampaignMonitor">CampaignMonitor</option>
                                      <option defaultValue="MailUp">MailUp</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}

                          <div className="submit step">

                            <h3 className="main_question"><strong>3/3</strong>Merci de remplir vos coordonnées</h3>

                            <div className="row">

                              <div className="col-sm-6">

                                <div className="form-group">
                                  <input type="text" name="firstname" className="required form-control" placeholder="Prénom" />
                                </div>
                                <div className="form-group">
                                  <input type="text" name="lastname" className="required form-control" placeholder="Nom" />
                                </div>
                              </div>

                              <div className="col-sm-6">
                                <div className="form-group">
                                  <input type="email" name="email" className="required form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                  <input type="text" name="telephone" className="required form-control" placeholder="Telephone" />
                                </div>

                              </div>
                            </div>

                            <div className="form-group checkbox_questions">
                              <input name="terms" type="checkbox" className="icheck required" defaultValue="yes" />
                              <label>Please accept <a href="#" data-toggle="modal" data-target="#terms-txt">terms and conditions</a> ?
                              </label>
                            </div>

                          </div>
                        </div>
                        <div id="bottom-wizard">
                          <button type="button" name="backward" className="backward">Backward </button>
                          <button type="button" name="forward" className="forward">Forward</button>
                          <button type="submit" name="process" className="submit">Submit</button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="tab_2">
                <div className="subheader" id="about"></div>
                <div className="row">
                  <div className="col-lg-8">
                    <h2>Welcome to Quote</h2>
                    <p className="lead">An mei sadipscing dissentiet, eos ea partem viderer facilisi. Brute nostrud democritum in vis, nam ei erat zril mediocrem. No postea diceret vix. Mei eu scripta dolorum voluptatibus, id omnes repudiare pri.</p>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="box_feat" id="icon_1">
                          <span></span>
                          <h3>Responsive site design</h3>
                          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="box_feat" id="icon_2">
                          <span></span>
                          <h3>Web site check</h3>
                          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="box_feat" id="icon_3">
                          <h3>Email campaigns</h3>
                          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="box_feat" id="icon_4">
                          <h3>Seo optimization</h3>
                          <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="about_info">
                            <i className="pe-7s-news-paper"></i>
                            <h4>A brief about Quote<span>Suas summo id sed, erat erant oporteat cu pri.</span></h4>
                            <p>Cum iusto nonumes dignissim ad, movet vocent ceteros nec ut. Eu putent utroque ius, ei usu purto doctus, ludus nostrud consectetuer ex pri. Maiorum petentium similique duo id. Sea ex nostro offendit, ius sumo electram theophrastus et. Nam eu dolore aliquid laoreet, ei eos tacimates assueverit inciderint. His deserunt recteque consequat in. Vis mucius virtute consequat ad, suavitate interesset an mei, oporteat temporibus at sea.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="about_info">
                            <i className="pe-7s-light"></i>
                            <h4>Mission<span>Suas summo id sed, erat erant oporteat cu pri.</span></h4>
                            <p>Cum iusto nonumes dignissim ad, movet vocent ceteros nec ut. Eu putent utroque ius, ei usu purto doctus, ludus nostrud consectetuer ex pri. Maiorum petentium similique duo id. Sea ex nostro offendit, ius sumo electram theophrastus et. Nam eu dolore aliquid laoreet, ei eos tacimates assueverit inciderint. His deserunt recteque consequat in. Vis mucius virtute consequat ad, suavitate interesset an mei, oporteat temporibus at sea.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside className="col-lg-4">
                      <div className="more_padding_left">
                        <div className="widget" id="review">
                          <h4>reviews</h4>
                          <div className="owl-carousel owl-theme add_bottom_30">
                            <div className="item">
                              <blockquote className="testimonial">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit vehicula est, in consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit vehicula est, in consequat. Donec hendrerit vehicula est, in consequat. Donec hendrerit vehicula est, in consequat.
                                </p>
                              </blockquote>
                              <div className="testimonial-arrow-down">
                              </div>
                              <div className="testimonial-author">
                                <div className="img-thumbnail img-thumbnail-small">
                                  <img src="./src/assets/img/avatar1.jpg" alt="" />
                                </div>
                                <p>
                                  <strong>Mark Smith</strong><span>October 2016</span>
                                </p>
                              </div>
                            </div>
                            <div className="item">
                              <blockquote className="testimonial">
                                <p>
                                  Donec hendrerit vehicula est, in consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit vehicula est, in consequat. Donec hendrerit vehicula est, in consequat. Donec hendrerit vehicula est, in consequat.
                                </p>
                              </blockquote>
                              <div className="testimonial-arrow-down">
                              </div>
                              <div className="testimonial-author">
                                <div className="img-thumbnail img-thumbnail-small">
                                  <img src="./src/assets/img/avatar2.jpg" alt="" />
                                </div>
                                <p>
                                  <strong>Mark Smith</strong><span>September 2016</span>
                                </p>
                              </div>
                            </div>
                            <div className="item">
                              <blockquote className="testimonial">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit vehicula est, in consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit vehicula est, in consequat. Donec hendrerit vehicula est, in consequat.
                                </p>
                              </blockquote>
                              <div className="testimonial-arrow-down">
                              </div>
                              <div className="testimonial-author">
                                <div className="img-thumbnail img-thumbnail-small">
                                  <img src="./src/assets/img/avatar3.jpg" alt="" />
                                </div>
                                <p>
                                  <strong>Mark Smith</strong><span>July 2016</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="widget" id="gallery">
                          <h4>gallery</h4>
                          <ul className="magnific-gallery">
                            <li>
                              <a href="img/gallery/large_1.jpg" title="image title">
                                <figure><img src="./src/assets/img/gallery/thumb_1.jpg" alt="thumb" /></figure>
                              </a>
                            </li>
                            <li>
                              <a href="img/gallery//large_2.jpg" title="image title">
                                <figure><img src="./src/assets/img/gallery/thumb_2.jpg" alt="thumb" /></figure>
                              </a>
                            </li>
                            <li>
                              <a href="img/gallery/large_3.jpg" title="image title">
                                <figure><img src="./src/assets/img/gallery/thumb_3.jpg" alt="thumb" /></figure>
                              </a>
                            </li>
                            <li>
                              <a href="img/gallery/large_4.jpg" title="image title">
                                <figure><img src="./src/assets/img/gallery/thumb_2.jpg" alt="thumb" /></figure>
                              </a>
                            </li>
                            <li>
                              <a href="img/gallery/large_5.jpg" title="image title">
                                <figure><img src="./src/assets/img/gallery/thumb_3.jpg" alt="thumb" /></figure>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="widget" id="follow">
                          <h4>follow us</h4>
                          <ul>
                            <li><a href="#"><i className="icon-facebook"></i>Facebook</a></li>
                            <li><a href="#"><i className="icon-twitter"></i>Twitter</a></li>
                            <li><a href="#"><i className="icon-google"></i>Google plus</a></li>
                            <li><a href="#"><i className="icon-instagram"></i>Instagram</a></li>
                          </ul>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="tab_3">

                <div id="map_contact"></div>

                <div id="contact_info">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="box_contact">
                        <i className="pe-7s-map-marker"></i>
                        <h4>Address</h4>
                        <p>Duo magna vocibus electram ad. Sit an amet aeque legimus, paulo mnesarchum et mea, et pri quodsi singulis.</p>
                        <p>11 Fifth Ave - New York, 45 001238 - USA</p>
                        <a href="https://www.google.com/maps/dir//11+5th+Ave,+New+York,+NY+10003,+Stati+Uniti/@40.7322935,-73.9981148,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x89c25990b3af8bb9:0x854ae1d3553155!2m2!1d-73.9959261!2d40.7322935!3e0" className="btn_1" target="_blank">Get directions</a>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="box_contact">
                        <i className="pe-7s-mail-open-file"></i>
                        <h4>Email and website</h4>
                        <p>Duo magna vocibus electram ad. Sit an amet aeque legimus, paulo mnesarchum et mea, et pri quodsi singulis.</p>
                        <p>
                          <strong>Email:</strong> <a href="#0">support@domain.com</a><br />
                          <strong>Website:</strong> <a href="#0">www.quote.com</a>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="box_contact">
                        <i className="pe-7s-call"></i>
                        <h4>Telephone</h4>
                        <p>Duo magna vocibus electram ad. Sit an amet aeque legimus, paulo mnesarchum et mea, et pri quodsi singulis.</p>
                        <p>
                          <strong>Tel:</strong> <a href="#0">+44 543 53433</a><br />
                          <strong>Fax:</strong> <a href="#0">+44 543 5322</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div id="social">
                    <ul>
                      <li><a href="#"><i className="icon-facebook"></i></a></li>
                      <li><a href="#"><i className="icon-twitter"></i></a></li>
                      <li><a href="#"><i className="icon-google"></i></a></li>
                      <li><a href="#"><i className="icon-linkedin"></i></a></li>
                    </ul>
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
