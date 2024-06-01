import React, { Component } from 'react'
import { Text, StyleSheet, View ,ImageBackground, ImageBase, Platform,ScrollView, TextInput,TouchableOpacity,Alert} from 'react-native'
import *as Animatable from 'react-native-animatable'
import Ionicons from 'react-native-vector-icons/Ionicons'

import LinearGradient from 'react-native-linear-gradient'
export default class Login extends Component {
    constructor(){
        super()

        this.state={
            username:'',
            passward:'',
            name:'',
            telephone:'',
            department:'',
            mail:'', 
	        gender:'',     
          	position:'',   
	        age:'',  
	        wordid: '',
            validateUsername:false,
            isValidUser:true,
         // validatePassword:false,
            secureTextEntry:true,
            isValidPassword:true
        }
    }
    validateUsername=(val)=>{
        if(val.trim().length>=4){
            this.setState({
                username:val,
                validateUsername:true,
                isValidUser:true
            })
        }else {
            this.setState({
                username:val,
                validateUsername:false,
                isValidUser:false
            })
        }
    }
    validateName=(val)=>{
    
            this.setState({
                name:val,
            })
      
    }
    validatetelephone=(val)=>{
            this.setState({
                telephone:val,
            })
       
    }
    validateDepartment=(val)=>{
    
        this.setState({
            department:val,
        })
  
}
    validateMail=(val)=>{
        this.setState({
            mail:val,
        })
   
}
validateGender=(val)=>{
    
    this.setState({
        gender:val,
    })

}
validatePosition=(val)=>{
    this.setState({
        position:val,
    })

}
validateAge=(val)=>{

this.setState({
    age:val,
})

}
validateWordid=(val)=>{
this.setState({
    wordid:val,
})

}
    handleValidUser=(val)=>{
        if(val.trim().length>=4){
            this.setState({
                isValidUser:true
            })
        }else {
            this.setState({
                isValidUser:false
            })
        }
    }
    validatePassword=(val)=>{
        if(val.trim().length>=8){
            this.setState({
                passward:val,
              //  validatePassword:true,
                isValidPassword:true
            })
        }else {
            this.setState({
                passward:val,
               // validatePassword:false,
                isValidPassword:false
            })
        }
    }
    updateSecureTextEntry=()=>{
        this.setState({
            secureTextEntry:!this.state.secureTextEntry
        })
    }
    handleRegister=()=>{
        //先判断表单信息
        if(this.state.username.length == 0 || this.state.passward.length == 0){
            Alert.alert('输入错误','用户名和密码不能为空')
            return;
        }
        if(this.state.username.length <4){
            Alert.alert('用户名太短','用户名最短为4位')
            return;
        }
        if(this.state.passward.length <8){
            Alert.alert('密码太短','密码最短为8位')
            return;
        }

        let userInfo={
            username:this.state.username,
            passward:this.state.passward
        }
        
        //调用接口，执行登录
       // Alert.alert('成功','注册成功')
        //this.props.navigation.navigate('登录')
        let url = "http://192.168.0.7:3002/register";
        let opts = {
            method: "POST",   //请求方法
            body:JSON.stringify({
                "username":String (this.state.username),
                "password":String (this.state.passward),
                "name": String (this.state.name),
                "telephone": String (this.state.telephone),
                "department":String (this.state.department),
                "mail":String (this.state.mail), 
             	"gender":String (this.state.gender),     
            	"position":String (this.state.position),   
	            "age":String (this.state.age),  
            	"wordid":String (this.state.wordid)   
              })   //请求体
            }
        fetch(url, opts //请求体
            ).then(res=>res.json())
           .then((res)=>{
            console.log(res)
            this.setState({
                code:res.code   
              })
              if(this.state.code ==  422){
                Alert.alert('注册失败','用户已存在或电话号码不是11位')
                return;
            }
            else{
                //this.props.loginSuccess(userInfo)
                //调用接口，执行登录
                   Alert.alert('成功','注册成功')
                   this.props.navigation.navigate('登录')
            }
        }).catch(error => {
          console.error('POST请求错误:', error);
        })

        console.log(this.state.code)
    }
  render() {
    return (
      <View style={[styles.container]}>
        <ImageBackground source={require('../../images/Log.jpg')} style={[styles.bgImage]}>
           <View style={[styles.header]}>
               <Text style={[styles.headerText]}>
                   Register！
               </Text>
           </View>
           <Animatable.View
               animation="fadeInUpBig"
               style={[styles.footer]}
               >
                   <ScrollView>
                       <View style={[styles.action]}>
                           <Ionicons name={'person-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="用户名"
                           value={this.state.username}
                           onChangeText={(val)=> this.validateUsername(val)}
                           onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                            {
                                this.state.validateUsername ?        //如果用户名大于4位，显示对钩，否则什么也不显示
                                <Animatable.View animation='bounceIn'>
                                    <Ionicons name={'checkmark-circle-outline'} size={20} />
                                </Animatable.View>
                                :
                                null
                            }
                       </View>
                       {
                           this.state.isValidUser
                           ?
                           null
                           :
                           <Animatable.View animation='fadeInLeft' duration={500}>
                                <Text style={[styles.errorMsg]}>用户名最短是4位</Text>
                            </Animatable.View>
                       }

                        <View style={[styles.action]}>
                           <Ionicons name={'lock-closed-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="密码"
                           secureTextEntry={this.state.secureTextEntry ? true : false}
                           onChangeText={(val)=> this.validatePassword(val)}
                            />
                            <TouchableOpacity onPress={this.updateSecureTextEntry}>
                            {
                                this.state.secureTextEntry
                                 ?       
                                <Ionicons name={'eye-off-outline'} size={20} />
                                :
                                <Ionicons name={'eye-outline'} size={20} />
                            }
                            </TouchableOpacity>
                       </View>
                       {
                           this.state.isValidPassword
                           ?
                           null
                           :
                           <Animatable.View animation='fadeInLeft' duration={500}>
                                <Text style={[styles.errorMsg]}>密码最短为8位</Text>
                            </Animatable.View>
                       }

                      
                        <View style={[styles.action]}>
                           <Ionicons name={'person-circle-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="姓名"
                         //  secureTextEntry={this.state.secureTextEntry ? true : false}
                           onChangeText={(val)=> this.validateName(val)}
                    /></View>
                     

                     <View style={[styles.action]}>
                           <Ionicons name={'call-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="电话(11位)"
                           value={this.state.telephone}
                           onChangeText={(val)=> this.validatetelephone(val)}
                           //onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                            
                       </View>
                     
                       <View style={[styles.action]}>
                           <Ionicons name={'code-working-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="部门"
                           value={this.state.department}
                           onChangeText={(val)=> this.validateDepartment(val)}
                           //onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                       </View>
                       <View style={[styles.action]}>
                           <Ionicons name={'language-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="工号"
                           value={this.state.wordid}
                           onChangeText={(val)=> this.validateWordid(val)}
                           //onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                       </View>
                      
                       <View style={[styles.action]}>
                           <Ionicons name={'person-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="职位"
                           value={this.state.position}
                           onChangeText={(val)=> this.validatePosition(val)}
                           //onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                       </View>
                       <View style={[styles.action]}>
                           <Ionicons name={'person-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="年龄"
                           value={this.state.age}
                           onChangeText={(val)=> this.validateAge(val)}
                           //onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                       </View>
                       <View style={[styles.action]}>
                           <Ionicons name={'person-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="性别"
                           value={this.state.gender}
                           onChangeText={(val)=> this.validateGender(val)}
                           //onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                       </View>
                        <View style={[styles.action]}>
                           <Ionicons name={'mail-outline'} size={20} />
                           <TextInput
                           style={[styles.input]}
                           placeholder="邮箱"
                           value={this.state.mail}
                           onChangeText={(val)=> this.validateMail(val)}
                           //onEndEditing={(e)=> this.handleValidUser(e.nativeEvent.text)}
                            />
                       </View>


                       {/*按钮*/ }
                       <View style={styles.button}>
                       
                           <TouchableOpacity
                           onPress={()=>{this.handleRegister()}
                            /*this.props.navigation.navigate('登录')*/
                        }
                           style={[
                               styles.signIn,{
                                   borderColor:'#009387',
                                   borderWidth:0.5,
                                   marginTop:15
                               }
                           ]}
                           >
                               <Text style={[styles.textSign,{color:'#009387'},{textAlign:'center'}]}>注册</Text>

                           </TouchableOpacity>
                       </View>
                   </ScrollView>
           </Animatable.View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bgImage:{
        flex:1,
        resizeMode:'cover',
        justifyContent:'center'
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingBottom:30
    },
    headerText:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30,
        textAlign:'center'
    },
    footer:{
        flex:10,
        backgroundColor:'#fff',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingHorizontal:20,
        paddingVertical:30
    },
    action:{
        flexDirection:'row',
        marginTop:5,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    input:{
        flex:1,
        marginTop:Platform.OS=='ios' ? 0 :-12,
        paddingLeft:10,
        color:'#05375a'
    },
    errorMsg:{
        color:'red',
        fontSize:14
    },
    signIn:{
        marginTop:30,
       // borderBottomWidth:2,
        paddingBottom:10,
        //marginHorizontal:30
        paddingVertical:5
    },
    textSign:{
        fontSize:20
    },
    button:{
        marginHorizontal:60
    }
})
