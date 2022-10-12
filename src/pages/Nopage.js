import Layout from "./Layout.js";

function Nopage(){
    return(
        <div>
            <Layout />
            <div style={{'position':'absolute','top':'50%','left':'50%','transform':'translate(-50%, -50%)','textAlign':'center'}}>
            <i className="fa fa-times-circle fa-3x"></i>
            <h1>404 : Sorry, No data found!</h1>
            </div>
            
        </div>
    )
}
export default Nopage