import React, { useState, createRef } from "react"
import { Table, Button, Form, input } from "semantic-ui-react"
import InputBox from "../BasicComponents/InputBox.js"
import Header from "../BasicComponents/Header.js"
import CustomSelect from "../BasicComponents/CustomSelect.js"
import RadioButtons from "../BasicComponents/RadioButtons.js"
import CommentBox from "../BasicComponents/CommentBox.js"
import Buttons from "../BasicComponents/Buttons.js"
import styled from "styled-components"
import Axios from "axios"
import { useGet } from "../Constants/useRest.js"
import UserIcon from "../Icons/User.png"
import { TOTAL_LENGTH } from "../Constants/URI.js"
import { Modal } from "semantic-ui-react"
import BottomBorderTable from "../BasicComponents/BottomBorderTable.js"
import HeaderNameContext from "../Contexts/HeaderNameContext.js"

const ButtonAlign = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

const Asteric = styled.span`
  color: red;
`

const Heading = styled.div`
  display: flex;
  font-weight: bold;
  text-decoration: underline;

  justify-content: flex-start;
  padding: 10px;
  margin: 30px;
`
const Registration = ({ history, match }) => {
  const [state, setState] = useState({
    firstName: "Mihir",
    lastName: "",
    email: "",
    countryDropDown: "",
    fileUpload: [],
    comment: "",
    date: "",
    radiogroup: "",
    Hindu: "",
    Jews: "",
    budhist: ""
  })

  let derivedReligion = ""
  if (state.Hindu === "on") {
    derivedReligion = "Hindu"
  } else if (state.Jews === "on") {
    derivedReligion = "Jews"
  } else {
    derivedReligion = "budhist"
  }
  function HandleInput(e) {
    setState({
      ...state,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    })
  }

  const { data } = useGet("http://localhost:5000/country")

  const Labels = [
    { Label: "Male", value: "Male" },
    { Label: "Female", value: "Female" },
    { Label: "Other", value: "Other" }
  ]

  const Text = React.useContext(HeaderNameContext)
  const FirstNameRef = createRef()
  return (
    <>
      <Form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault()
          if (
            state.firstName === "" ||
            state.lastName === "" ||
            state.email === ""
          ) {
            alert("Please submit all fields")
          } else {
            Axios.post("http://localhost:5000/register", {
              firstName: state.firstName,
              lastName: state.lastName,
              country: state.countryDropDown,
              email: state.email,
              date: state.date,
              comment: state.comment,
              religion: derivedReligion,
              gender: state.radiogroup,
              doc: state.fileUpload
            })

            history.push(`/Success`)
          }
        }}
      >
        <Form.Field>
          <Header header={Text.Text} path={UserIcon} />

          <Heading>
            <h2>Basic Information </h2>
          </Heading>

          <BottomBorderTable selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Fields</Table.HeaderCell>
                <Table.HeaderCell>Values</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  कृपया आपले नाव प्रविष्ट करा<Asteric>*</Asteric>:
                </Table.Cell>
                <Table.Cell>
                  <InputBox
                    id="firstName"
                    type="text"
                    name="firstName"
                    ref={FirstNameRef}
                    placeholder="FirstName"
                    value={state.firstName}
                    onPress={HandleInput}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  कृपया आपले आडनाव प्रविष्ट करा <Asteric>*</Asteric>
                </Table.Cell>
                <Table.Cell>
                  <InputBox
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    value={state.lastName}
                    onPress={HandleInput}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  कृपया आपला ईमेल प्रविष्ट करा<Asteric>*</Asteric>
                </Table.Cell>
                <Table.Cell>
                  <input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={state.email}
                    onChange={HandleInput}
                    name="email"
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  तुमचा देश निवडा <Asteric>*</Asteric>
                </Table.Cell>
                <Table.Cell>
                  <CustomSelect
                    name="countryDropDown"
                    options={data}
                    value={state.countryDropDown}
                    handleChange={HandleInput}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  आपले लिंग निवडा <Asteric>*</Asteric>
                </Table.Cell>
                <Table.Cell>
                  <label>
                    Male
                    <input
                      style={{ margin: "10px" }}
                      id="Male"
                      type="radio"
                      value="Male"
                      name="radiogroup"
                      onChange={HandleInput}
                    />
                  </label>
                  <label>
                    Female
                    <input
                      style={{ margin: "10px" }}
                      id="Female"
                      type="radio"
                      value="Female"
                      name="radiogroup"
                      onChange={HandleInput}
                    />
                  </label>
                  <label>
                    Other
                    <input
                      style={{ margin: "10px" }}
                      id="Other"
                      type="radio"
                      value="Other"
                      name="radiogroup"
                      onChange={HandleInput}
                    />
                  </label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  तुमचा धर्म निवडा<Asteric>*</Asteric>:{" "}
                </Table.Cell>
                <Table.Cell>
                  <label>
                    Hindu
                    <input
                      style={{ margin: "10px" }}
                      id="Hindu"
                      type="checkbox"
                      checked={state.Hindu}
                      name="Hindu"
                      onChange={HandleInput}
                    />
                  </label>
                  <label>
                    Budhist
                    <input
                      style={{ margin: "10px" }}
                      id="Budhist"
                      type="checkbox"
                      checked={state.budhist}
                      name="budhist"
                      onChange={HandleInput}
                    />
                  </label>
                  <label>
                    Jews
                    <input
                      style={{ margin: "10px" }}
                      id="Jews"
                      type="checkbox"
                      checked={state.Jews}
                      name="Jews"
                      onChange={HandleInput}
                    />
                  </label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  जन्मतारीख निवडा<Asteric>*</Asteric>{" "}
                </Table.Cell>
                <Table.Cell>
                  <InputBox
                    id="date"
                    type="Date"
                    name="date"
                    Value={state.date}
                    onPress={HandleInput}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>कर उद्देशाने आपला देश निवडा</Table.Cell>
                <Table.Cell>
                  <Modal trigger={<Button>Add Taxation Country</Button>}>
                    <Modal.Header>Select one country</Modal.Header>
                    <Modal.Content>
                      <CustomSelect
                        id="countryDropDown"
                        name="countryDropDown"
                        options={data}
                        value={state.popUpCountry}
                        handleChange={HandleInput}
                      />
                      <Button secondary style={{ margin: "60px" }}>
                        Add
                      </Button>
                      <p> {`Do you have TIN with you?`} </p>
                      <RadioButtons options={Labels} />
                    </Modal.Content>
                  </Modal>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  कागदपत्रे अपलोड करा<Asteric>*</Asteric>
                </Table.Cell>
                <Table.Cell>
                  <InputBox
                    id="file"
                    type="file"
                    name="fileUpload"
                    accept=".pdf"
                    value={state.fileUpload}
                    onPress={HandleInput}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  टिप्पण्या<Asteric>*</Asteric>{" "}
                </Table.Cell>
                <Table.Cell>
                  <CommentBox
                    id="comment"
                    name="comment"
                    value={state.comment}
                    onComment={HandleInput}
                  />
                  {`${state.comment.length}/${TOTAL_LENGTH}`}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </BottomBorderTable>

          <ButtonAlign>
            <Buttons type="submit" value="submit" text="Submit the information" />
          </ButtonAlign>
        </Form.Field>
      </Form>
    </>
  )
}

export default Registration