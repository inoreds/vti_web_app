import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';
import { connect } from "remx";
import authStore from "../stores/auth";
import interview from '../stores/interview';
import dataStore from '../stores/data';
const nodata = '../../assets/img/logo.png';

class VideoCallPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showinfo: true,
            room_name:this.props.room_id,
            room_id: this.props.room_id,
            room_status: this.props.room_status,
            display_name:"",
            hidden_btn_join_room: true
        }
        this.join = this.join.bind(this);
        this.unload = this.unload.bind(this);
        this.api = null;
    }

    componentDidMount() {
        // this.$el = $(this.el);
        // this.$el.somePlugin();
    }

    componentWillUnmount() {
        //this.$el.somePlugin('destroy');
    }

    handleChangeRoomName(event) {
        this.setState({room_name: event.target.value})
    }

    handleChangeDisplayName(event) {
        this.setState({display_name: event.target.value})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.videoStat !== prevState.videoStat) {
            interview.setVidStat(this.state.videoStat);
        }
        if(this.props.hidden_btn_join_room !== prevState.hidden_btn_join_room){
            interview.setbtn(this.state.hidden_btn_join_room)
        }
        // if(this.props.room_id != prevProps.room_id) {
        //     console.log(this.props.room_id.replace(/-/g, ''))
        //     this.setState({room_name : this.props.room_id.replace(/-/g, '')})
        //     // this.setState({room_name : "mdk123"})
        // }
        // this.setState({room_name : this.state.room_id.replace(/-/g, '')})
    }

    render() {
        console.log(this.state.room_id)
        return (
            <div>
                {/* room : {this.state.room_name} */}
                <div className="animated fadeIn align-items-center" style={{position:'relative', minHeight:'13em'}}>
                    <Row className="justify-content-center">
                        <div style={{position:'absolute', top:'1em', left:'1em', zIndex:999}}>
                            <img src={nodata} style={{ width: '100%', height: '40px', objectFit: 'contain'}} alt=""/>
                        </div>
                        <div style={{width:'100%', backgroundColor:'black', height:'600px', position:'relative'}}>
                            <div className="vcpanel" >
                                <div id="vccontent">
                                    {/* <div id="vcinfo" hidden={!this.state.showinfo}>
                                        click the join button if you are ready to make a conference
                                    </div> */}
                                </div>
                            </div>
                            <div id="div_noFriends" style={{position:'absolute', left: '50%', top: '50%', zIndex:80, transform: 'translate(-50%, -50%)'}}>
                                {/* {!this.props.room_id ?
                                    <Button className="btn-red icon mr-1 mb-1" outline color="danger"><i className="fa fa-user-circle-o" style={{fontSize:'45px', marginBottom:'5px'}}></i> <br/>Pilih Peserta</Button>
                                    :
                                    this.state.hidden_btn_join_room === true ?
                                        <Button className="btn-dark icon mr-1 mb-1" outline color="primary" onClick={this.join}><i className="fa fa-play" style={{fontSize:'45px', marginBottom:'5px'}}></i> <br/>Mulai Interview</Button>
                                        :
                                        <Button className="btn-dark icon mr-1 mb-1" outline color="primary"><i className="fa fa-circle-o-notch fa-lg fa-spin" style={{fontSize:'45px', marginBottom:'5px'}}></i> <br/>Tunggu Peserta</Button>
                                } */}
                                               <Button className="btn-dark icon mr-1 mb-1" outline color="primary" onClick={this.join}><i className="fa fa-play" style={{fontSize:'45px', marginBottom:'5px'}}></i> <br/>Mulai Interview</Button>
                         
                            </div>
                        </div>
                    </Row>
                </div>
                <div style={{position:'absolute', display:'inline-block', marginTop:'-9em'}}>
                    <div style={{textAlign:'center', marginTop:'5em', marginBottom:'2em', zIndex:91, display:'inline-block'}}>
                        {this.state.hidden_btn_join_room === false ?
                        <div>
                        {/* <Button color="btn btn-default" style={{borderRadius:'50%', height:'50px', width:'50px', marginLeft:'1em'}} onClick={() => this.setMic()}><i className="fa fa-microphone-slash fa-lg"></i></Button> */}
                        <Button color="btn btn-danger" style={{borderRadius:'25px', height:'40px', width:'130px'}} onClick={this.unload}><i className="fa fa-stop fa-lg"></i>&nbsp;&nbsp; Berhenti</Button>
                        {/* <Button color="btn btn-default" style={{borderRadius:'50%', height:'50px', width:'50px', marginLeft:'1em'}} onClick={() => this.setCam()}><i className="fa fa-eye-slash fa-lg"></i></Button> */}
                        </div>
                        :
                        ''
                        }
                        </div>
                </div>
            </div>
        );
    }


    join() {
        document.getElementById("div_noFriends").classList.add( "collapse" )
        this.setState({ 
            hidden_btn_join_room: false, 
            videoStat : true,
            showinfo: false
        });

        var domain = 'videoserver.clouds.id';
        var options = {
            roomName: this.state.room_id.replace(/-/g, ''),
            width: '100%',
            height: '600px',
            parentNode: document.querySelector('#vccontent'),
            configOverwrite: {},
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
                DISPLAY_WELCOME_PAGE_CONTENT: false,
                RECENT_LIST_ENABLED: false,
                SUPPORT_URL: 'https://videoserver.clouds.id',
                LIVE_STREAMING_HELP_LINK: 'https://videoserver.clouds.id',
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                INVITATION_POWERED_BY: false,
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'desktop', 'fullscreen', 'fodeviceselection', 'profile', 
                    'etherpad', 'settings', 'videoquality', 'filmstrip', 'stats', 'shortcuts',
                    'tileview'
                ],
            }
        }
        this.api = new window.JitsiMeetExternalAPI(domain, options);
        this.api.executeCommand('displayName', this.state.display_name);
        dataStore.setters.setModalNoteInterview(true)
    }

    unload() {
        document.getElementById("div_noFriends").classList.remove( "collapse" )
        try {
            this.setState({
                hidden_btn_join_room: true, 
                videoStat : false,
                showinfo: true
            });
            this.api.executeCommand('hangup');
            this.api.dispose();
            dataStore.setters.setModalNoteInterview(false)
        }
        catch (err) {
        }

    }



}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        hidden_btn_join_room: interview.getbtn()
    }
}

export default connect(mapStateToProps)(VideoCallPanel);
