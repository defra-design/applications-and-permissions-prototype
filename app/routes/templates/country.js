let section = 'templates';
let sectionURL = '/' + 'templates' + '/';

module.exports = function (router)
{

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////            COUNTRY ENTRY - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_COUNTRY
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. Optional - Remove the checks below for invalid characters.

    router.post( sectionURL + 'PAGENAME_COUNTRY-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        const countries = ['Abu Dhabi', 'Afghanistan', 'Ajman', 'Akrotiri', 'Albania', 'Algeria',
            'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina',
            'Armenia', 'Aruba', 'Ascension', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Baker Island',
            'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia',
            'Bonaire', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Antarctic Territory',
            'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
            'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Ceuta',
            'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo',
            'Congo (Democratic Republic)', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Curaçao', 'Cyprus',
            'Czechia', 'Czechoslovakia', 'Denmark', 'Dhekelia', 'Djibouti', 'Dominica', 'Dominican Republic', 'Dubai',
            'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia',
            'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia',
            'French Southern Territories', 'Fujairah', 'Gabon', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece',
            'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
            'Heard Island and McDonald Islands', 'Honduras', 'Hong Kong', 'Howland Island', 'Hungary', 'Iceland',
            'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Ivory Coast',
            'Jamaica', 'Japan', 'Jarvis Island', 'Jersey', 'Johnston Atoll', 'Jordan', 'Kazakhstan', 'Kenya',
            'Kingman Reef', 'Kiribati', 'Kosovo', 'Latvia', 'Latvia', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
            'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali',
            'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Melilla', 'Mexico',
            'Micronesia', 'Midway Islands', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco',
            'Mozambique', 'Myanmar (Burma)', 'Namibia', 'Nauru', 'Navassa Island', 'Nepal', 'Netherlands',
            'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'North Korea',
            'Northern Mariana Islands', 'Norway', 'Occupied Palestinian Territories', 'Oman', 'Pakistan', 'Palau',
            'Palmyra Atoll', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn, Henderson, ' +
            'Ducie and Oeno Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Ras al-Khaimah', 'Romania',
            'Russia', 'Rwanda', 'Réunion', 'Saba', 'Saint Barthélemy', 'Saint Helena', 'Saint Pierre and Miquelon',
            'Saint-Martin (French part)', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
            'Serbia', 'Seychelles', 'Sharjah', 'Sierra Leone', 'Singapore', 'Sint Eustatius',
            'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
            'South Georgia and South Sandwich Islands', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
            'St Kitts and Nevis', 'St Lucia', 'St Vincent', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland',
            'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'The Bahamas',
            'The Gambia', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tristan da Cunha', 'Tunisia', 'Turkey',
            'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'USSR', 'Uganda', 'Ukraine', 'Umm al-Quwain',
            'United Arab Emirates', 'United Kingdom', 'United States', 'United States Virgin Islands', 'Uruguay',
            'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Wake Island', 'Wallis and Futuna',
            'Western Sahara', 'Yemen', 'Yugoslavia', 'Zambia', 'Zimbabwe', 'Åland Islands'];

        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';

        // Validation check if the field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-country-typeahead'] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-country-typeahead'] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect( '../' + page_name_submitted );
        }

        // Input too short
        else if ( countries.includes(req.session.data[ section + '-' + page_name_submitted + '-country-typeahead'] == false ) )
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect( '../' + page_name_submitted );
        }

        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect( '../' + 'check-answers' );
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect( '../' + 'THE_NEXT_PAGE_NAME' );
            }
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////            COUNTRY ENTRY - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


}
