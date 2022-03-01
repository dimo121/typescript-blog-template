import React from 'react';


const Home:React.FC = () => {

    return(    
        <h1 className='home'>
            <i>This is a React blog template built by Dimo Papadopoulos with typescript on the front end and AWS serverless on the backend. It is being shared with the React community to facilitate learning and development. V3.0 integrates API Gateway photo upload and third party packages to DynamoDB and Appsync all mounted with CDK on a Cloudfront distribution and secured with AWS Cognito. Appsync is currently running on Lambda functions as a data source and further development will introduce Apache Velocity Templates for improved performance and scaling. Please find the links below and feel free to contact me for further information.  </i>
        </h1>
    );
}

export default Home;