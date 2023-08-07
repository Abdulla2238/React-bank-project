import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { BiAddToQueue } from 'react-icons/bi';
import Array from './List';
import './Request.css';
import quest from './Newdata';

const Request = () => {


  
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('');

  const filteredAccounts = Array.filter(
    (account) => account.customeraccountnumber === selectedAccountNumber
  );

  const handleAccountNumberClick = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
  };

  const [formData, setFormData] = useState({
    branchCode: '',
    branchName: '',
    customerName: '',
    customerAccountNumber: '',
    customerAccountType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(e)
  };

 

  const [showTodo, setShowTodo] = useState(false);

   const localData = JSON.parse(localStorage.getItem('qus'))

    const [questions, setQuestion] = useState(localData ? localData: quest);

   function upload(){

      localStorage.setItem ('formData',JSON.stringify(formData));
        localStorage.setItem('qus',JSON.stringify(quest));
    setShowUpload(false)
    setProceedContinue(true)
    localStorage.setItem('proceedContinue', JSON.stringify(true));
    alert("success");
    // window.location.reload();

   }
 
   useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  const handleProceedContinue = () => {
    setProceedContinue(false); 
    setShowTodo(true); 
  };

  const handleAnswerChange = (index, selectedAnswer) => {
    if (index >= 0 && index < questions.length) {
     
      console.log(questions.answer, selectedAnswer);
      if (questions[index].answer === selectedAnswer) {
        const updated = [...questions];

        updated[index].answers = selectedAnswer;
        if (updated[index + 1]) {
          updated[index + 1].isVisible = true;
        }
        if(index===questions.length-1){
        
          setShowUpload(true)
        }
        setQuestion(updated);
      } else {
        alert('Please Select Correct Answer');
      }
    }
  };



  const [recommendedNames, setRecommendedNames] = useState([]);
  const [newName, setNewName] = useState('');

  const addRecommendedName = () => {
    if (newName.trim() !== '') {
      setRecommendedNames((prevNames) => [...prevNames, newName]);
      setNewName('');
    }
  };

  const deleteRecommendedName = (index) => {
    setRecommendedNames((prevNames) =>
      prevNames.filter((_, i) => i !== index)
    );
  };


  const [proceedContinue , setProceedContinue]=useState(
    JSON.parse(localStorage.getItem('proceedContinue')) || false
  )
  const [showUpload,setShowUpload]=useState(false)
  return (
    <div className="parent">
      <div className="link">
        <Link to="/" className="">
          DASHBOARD
        </Link>
        <h4 className="bar">/</h4> <h4 className="req">REQUEST FORM </h4>
      </div>
  
      <div className="heading">
        <h1>REQUEST FORM</h1>
      </div>
  
      <div className="maindiv">
        <div className="requestform">
          <div className="items">
            <label htmlFor="">Branch Code*</label>
            <input
              type="text"
              name=""
              id="branch-code"
              placeholder="Branch Code"
              onChange={(e) => handleAccountNumberClick(e.target.value)}
            />
          </div>
          <div className="items">
            <label htmlFor="">Branch Name*</label>
            <input
              type="text"
              name=""
              id="branch-name"
              placeholder="Branch-Name"
            />
          </div>
          <div className="items">
            <label htmlFor="">Customer Name*</label>
            <input
              type="text"
              name=""
              id="customer-name"
              placeholder="Customer Name"
            />
          </div>
          <div className="items">
            <label htmlFor="">Customer Account Number*</label>
            <input
              type="text"
              name=""
              id="customer-AC"
              placeholder="Customer Account Number"
              onClick={(e) => handleAccountNumberClick(e.target.value)}
            />
          </div>
          <div className="items">
            <label htmlFor="">Customer Account Type*</label>
            <select className="input-select" name="" id="">
              <option value="">....select....</option>
              <option value="">SA</option>
              <option value="">CA</option>
              <option value="">SA-NRE</option>
              <option value="">SA-NRO</option>
            </select>
          </div>
        </div>
  
        {selectedAccountNumber && (
          <div className="approved-claims">
            <h2 className="approvedclaims-head">Previous approved compensation claim</h2>
            <table id="claimsaprovedtable">
              <thead>
                <tr>
                  <th className="th-req">Requested on</th>
                  <th className="th-req">Compensation Amount(Rs.)</th>
                  <th className="th-req">Reason For Compensation</th>
                  <th className="th-req">Approved On</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.requestedOn}</td>
                    <td>{account.compensation}</td>
                    <td>{account.customeraccountnumber}</td>
                    <td>{account.customername}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
  
        <div>
        {questions.map((question, index) => (
                  <React.Fragment key={index}>
                    {question.isVisible && (
                      <div className="question-container">
                        <p className='question-text'>{question.question}</p>
                        <div className="radio-options">
                          <span>
                        <label>
                          <input
                            type="radio"
                            value="Yes"
                            checked={question.answers===true}
                            onChange={() => handleAnswerChange(index, true)}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            checked={question.answers===false}  
                            onChange={() => handleAnswerChange(index, false)}
                          />
                          No
                        </label>
                        </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
        </div>
  
      

  { showUpload &&(
               <div className='uploadbox'>
               <p className='req-box-para'>Please Upload Your Compensation Request Letter*</p>
               <div className='req-box-file'>
              <div className='req-box-file1'>
              <input type="file"  />
              </div>
              <div className='req-box-btn'>
                <button className='upload-btn'  onClick={upload}>upload</button>
              </div>
            </div>
            <ul className='ullist'>
              <li>upload a maximum of five files</li>
              <li>Each with a maximum of 2 MB</li>
              <li>Allowed file types of doc,pdf and excel </li>
            </ul>
                     
               </div>
                
               


             ) }

                { proceedContinue &&( 
                  
                  <button className='proceed' onClick={handleProceedContinue} >Proceed To Continue</button>
                ) }

           
       



      {showTodo && (
        
            <div className='todo'>
            <form >
              <div className='containertodo'>
                <div className='firstone'>
                  <label htmlFor="">Date of complaint (DD/MM/YYYY) *</label>
                  <input type="date" />
                  <label htmlFor="">Date of Identification of Incident (DD/MM/YYYY) *</label>
                  <input type="date" />
                  <label htmlFor="">Brief Description of the Incident</label>
                  <textarea name="" id="" cols="20" rows="10"></textarea>
                  <label htmlFor="">Compensation claimed (Rs.) *</label>
                  <input type="text" placeholder='Compensation claimed (Rs.)' />
                  <label htmlFor="">Recommender Name *</label> 
                  <div className='reccomend'>
                  <div>      <input  type="text"   value={newName}
          onChange={(e) => setNewName(e.target.value)} /></div>
          <div className='add'>  <BiAddToQueue  onClick={addRecommendedName}/></div>
          </div>
          <div className='listall'>
          <ul>
        {recommendedNames.map((name, index) => (
          <li key={index}>
            {name}
            <button className='delete-btn' onClick={() => deleteRecommendedName(index)}><MdDeleteOutline/></button>
          </li>
        ))}
      </ul>
          </div>
          
                </div>
                <div className='secondone'>
                <label htmlFor="">Date of occurence of Incident (DD/MM/YYYY) *</label>
                  <input type="date" />
                  <label htmlFor="">Debit GL a/c</label>
                  <input type="text" />
                  <label htmlFor="">Reason for Compensation *</label>
                  <textarea name="" id="" cols="20" rows="10"></textarea>
                  <label htmlFor="">Attachment</label>
                  <input type="file" />
              
                </div>
              </div>

              <button type='submit' className='submit'>Submit</button>
            </form>
            </div>
         
            )}
       
        
      
    
</div>
      
      </div>
     );
    };

  export default Request;