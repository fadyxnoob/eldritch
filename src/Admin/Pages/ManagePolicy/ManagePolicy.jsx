import React from 'react'

const ManagePolicy = () => {
    return (
        <div>
            <h1 className="px-2">Manage Privacy Policy</h1>
            <div>
                <textarea cols="30" rows="10"
                    className='resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-fit p-5'
                >
                Introduction
                Welcome to Eldritch Gaming Tournaments. At Eldritch Gaming Tournaments, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, participate in gaming tournaments, or interact with our services. By accessing or using the Eldritch Gaming Tournaments website and our services, you agree to the terms and practices described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please refrain from using our services.
                
                Information We Collect
                Your name Contact information, such as email address Username or gamer tag Payment information, if you make purchases through our platform Age or date of birth (to verify eligibility for certain tournaments)
                
                Log Data
                We collect information that your browser sends whenever you visit our Site. This may include your IP address, browser type, browser version, pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
                
                Cookies and Tracking Technologies
                We use cookies and similar tracking technologies to collect information about your interactions with our Site. This allows us to enhance your user experience, analyze trends, and improve our services. You can control the use of cookies through your browser settings.
                
                How We Use Your Information
                We use the information collected for the following purposes:
                
                To Provide Services
                We use your personal information to provide gaming tournaments, process payments, and communicate with you regarding tournament updates and important information.
                
                To Improve Services
                We use data to analyze and enhance the performance of our gaming tournaments and the user experience on our Site.
                
                Marketing and Promotions
                With your consent, we may use your information to send promotional materials, newsletters, and updates about our tournaments and services.
                
                Compliance and Security
                We may use your information to comply with legal obligations and to ensure the security and integrity of our services.
                
                Sharing Your Information
                We do not sell, rent, or trade your personal information to third parties. However, we may share your information in the following circumstances:</textarea>
            </div>
        </div>
    )
}

export default React.memo(ManagePolicy)
