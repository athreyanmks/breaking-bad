import React, {Component} from 'react';
import Charrow from './Charrow'

async function fetch_query(q)
    {
        let res

        res = await fetch(q)

        let results = await res.json()
        // console.log(results)
        return results;
        
    }

class Listing extends Component {

    // let result_master

    constructor(props) {
        super(props);
        this.state = 
        { 
            query : 'https://www.breakingbadapi.com/api/characters', 
            result : [],
            pagecount : 0,
            profilename : '',
            profile : [{"char_id":1,"name":"Walter White","birthday":"09-07-1958","occupation":["Meth Dealer"],"img":"https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg","status":"Presumed dead","nickname":"Heisenberg","appearance":[1,2,3,4,5],"portrayed":"Bryan Cranston","category":"Breaking Bad","better_call_saul_appearance":[]}],
            listlength : 0,
            search : '',
            category: '',
            quotes : []
        }
        // this,handleNext = this.handleNext.bind(this)
        // this,handlePrev = this.handlePrev.bind(this)
    }

    componentDidMount= () => {
        fetch(this.state.query+'?limit=10').then(res =>res.json()).then(result => {
            this.setState({result}, 
                () => {
                        this.setState({listlength: this.state.result.length},() => {
                        console.log(this.state.listlength + 'pages')
                        if(this.state.listlength< 10)
                        {
                            document.getElementById('next').disable = true
                        }
                    })

                })
            })

        

        fetch(this.state.query+'?limit=1').then(prof =>prof.json()).then(prof=> {
            this.setState({profile: prof},() =>{
                // console.log(this.state.profile)
                this.setState({profilename:this.state.profile[0].name}, 
                    () => {
                        fetch('https://www.breakingbadapi.com/api/quote?author=' + this.state.profilename.replace('/ /g','+')).then(quot =>quot.json()).then(quot=> {
                            this.setState({quotes: quot},() => {console.log(this.state.profile)})
                        })
                    })
                })
            })

       
    }

    handlePrev = () =>
    {
        if (this.state.pagecount > 0)
        {
            this.setState({
                pagecount : this.state.pagecount - 1}, 
                () => {fetch(this.state.query+'?limit=10&offset=' + this.state.pagecount*10 + '&name='+this.state.search+'&category='+this.state.category.replace('/ /g','+')).then(res =>res.json()).then(result => {
                    this.setState({result}, 
                        () => {
                                this.setState({listlength: this.state.result.length},() => {
                                console.log(this.state.listlength + 'pages')
                                if(this.state.listlength = 10)
                                {
                                    document.getElementById('next').disabled = false
                                }
                        })
        
                    })
                })
             })
        }
        
        

    }

    handleNext = () =>
    {
       this.setState({
           pagecount : this.state.pagecount + 1}, 
           () => {fetch(this.state.query+'?limit=10&offset=' + this.state.pagecount*10 +'&name='+this.state.search+'&category='+this.state.category.replace('/ /g','+')).then(res =>res.json()).then(result => {
            this.setState({result}, 
                () => {
                        this.setState({listlength: this.state.result.length},() => {
                        console.log(this.state.listlength + 'pages')
                        if(this.state.listlength< 10)
                        {
                            document.getElementById('next').disabled = true
                        }
                    })

                })
            })
        })
        

    }

    profilerender = (name) => {

        // console.log(name)

        let name_split = name.replace('/ /g','+')

        this.setState({profilename: name}, 
            () => {fetch(this.state.query+'?name='+name_split).then(prof =>prof.json()).then(prof=> {
                this.setState({profile: prof},() => {
                    fetch('https://www.breakingbadapi.com/api/quote?author=' + this.state.profilename.replace('/ /g','+')).then(quot =>quot.json()).then(quot=> {
                        this.setState({quotes: quot},() => {console.log(this.state.profile)})
                    })
                })
            })

        })

    }

    search = (event) => {

        fetch(this.state.query+'?limit=10'+'&name='+this.state.search+'&category='+this.state.category.replace('/ /g','+') + '&offset=' + this.state.pagecount*10).then(res =>res.json()).then(result => {
            this.setState({result})
        })

        event.preventDefault()

    }

    searchChange = (event) => {

        this.setState({ search : event.target.value})

    }

    categoryChange = (event) => {

        this.setState({category : event.target.value})
    }

    render() {

        // const {img,name,dob,occ,stat,nick,act,seas,cat} = this.state.profile[0]
        let a = [], b= []
        if(this.state.profile[0].appearance)
            a = this.state.profile[0].appearance;

        if(this.state.profile[0].occupation)
            b = this.state.profile[0].occupation

        return (
            <div>
                
                <div>
                    <div className = 'col-sm-6'>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className = 'row'>
                                <form onSubmit = {this.search}>
                                <div className = 'col-sm-3'>
                                    <select value = {this.state.category} onChange = {this.categoryChange}>
                                        <option value = ''>N/A</option>
                                        <option value = 'Breaking+Bad'>Breaking Bad</option>
                                        <option value = 'Better+Call+Saul'>Better Call Saul</option>
                                    </select>
                                </div>
                                <div className = 'col-sm-7'><input type = 'text' value = {this.state.search} onChange= {this.searchChange}></input></div>
                                <div className = 'col-sm-2'><button type = 'submit' className = 'btn-success'>Search</button></div>
                                </form>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Occupation</th>
                                    <th>DOB</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                            {
                            this.state.result.map(x =><Charrow key={x.id} var = {x} profilerend = {this.profilerender} />)

                            }
                                </tbody>
                            </table>
                        </div>
                        <div className="panel-footer">
                            <div className = 'row'>
                                <div className = 'col-sm-2'></div>
                                <div className = 'col-sm-3'><button onClick = {this.handlePrev} id = 'prev' className = 'btn-success'>Prev</button></div>
                                <div className = 'col-sm-2'>{this.state.pagecount+1}</div>
                                <div className = 'col-sm-3'><button onClick = {this.handleNext} id = 'next' className = 'btn-success'>Next</button></div>
                                <div className = 'col-sm-2'></div>
                            </div>
                        </div>
                    </div>
                    
                          
                    
                    <div className = 'row'></div>
                    </div>
                    <div className = 'col-sm-6'>
                        
                        <div className = 'panel panel-default'>
                            <div className = 'panel-heading'>
                                <div className='row'>
                                    <div className='col-sm-3'><img src={this.state.profile[0].img} className = 'img-thumbnail'></img></div>
                                    <div className='col-sm-9'><h2>{this.state.profile[0].name}</h2></div>
                                </div>
                            </div>
                            <div className = 'panel-body'>
                                
                                <div className='row'>
                                    <div className = 'col-sm-3'><b>Birthday:</b></div>
                                    <div className = 'col-sm-9'>{this.state.profile[0].birthday}</div>
                                </div>
                                <div className='row'>
                                    <div className = 'col-sm-3'><b>Occupation:</b></div>
                                    <div className = 'col-sm-9'>{this.state.profile[0].occupation.join()}</div>
                                </div>
                                <div className='row'>
                                    <div className = 'col-sm-3'><b>Status:</b></div>
                                    <div className = 'col-sm-9'>{this.state.profile[0].status}</div>
                                </div>
                                <div className='row'>
                                    <div className = 'col-sm-3'><b>Nickname:</b></div>
                                    <div className = 'col-sm-9'>{this.state.profile[0].nickname}</div>
                                </div>
                                <div className='row'>
                                    <div className = 'col-sm-3'><b>Actor:</b></div>
                                    <div className = 'col-sm-9'>{this.state.profile[0].portrayed}</div>
                                </div>
                                <div className='row'>
                                    <div className = 'col-sm-3'><b>Seasons:</b></div>
                                    <div className = 'col-sm-9'>{this.state.profile[0].appearance.join()}</div>
                                </div>
                                <div className='row'>
                                    <div className = 'col-sm-3'><b>Quotes:</b></div>
                                    <div className = 'col-sm-9'>
                                    {
                                        this.state.quotes.map(x => <blockquote><p>{x.quote}</p></blockquote>)
                                    }
                                    </div>
                                
                                </div> 
                            </div>
                        </div>
                           
                    </div>    
                
                </div>
            </div>
            
        
        );
    }
}
 
export default Listing;