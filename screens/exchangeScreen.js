import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends Component{
    constructor(){
        super()

        this.setState={
            NameOfObject:'',
            reasonToRequest : ''
        }
    }

    addRequest =(bookName,reasonToRequest)=>{
      var userId = this.state.userId
      var randomRequestId = this.createUniqueId()
      db.collection('requested_books').add({
          "user_id": userId,
          "book_name":bookName,
          "reason_to_request":reasonToRequest,
          "request_id"  : randomRequestId,
      })

    render(){
        return(
            <View style={{flex:1}}>
              <MyHeader title="Request" navigation ={this.props.navigation}/>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                  <TextInput
                    style ={styles.formTextInput}
                    placeholder={"item name"}
                    onChangeText={(text)=>{
                        this.setState({
                            NameOfObject:text
                        })
                    }}
                  />
                  <TextInput
                    style ={[styles.formTextInput,{height:300}]}
                    multiline
                    numberOfLines ={8}
                    placeholder={"item desripction"}
                    onChangeText ={(text)=>{
                        this.setState({
                            reasonToRequest:text
                        })
                    }}
                    value ={this.state.reasonToRequest}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{this.addRequest(this.state.NameOfObject,this.state.reasonToRequest)}}
                    >
                    <Text>Request</Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
      }
    }

    const styles = StyleSheet.create({
        formTextInput:{
          width:"75%",
          height:35,
          alignSelf:'center',
          borderColor:'#ffab91',
          borderRadius:10,
          borderWidth:1,
          marginTop:20,
          padding:10,
        },
        button:{
          width:"75%",
          height:50,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:10,
          backgroundColor:"#ff5722",
          shadowColor: "#000",
          shadowOffset: {
             width: 0,
             height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,
          elevation: 16,
          marginTop:20
          },
        }
      )
