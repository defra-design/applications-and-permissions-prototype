const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {




    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "/exotics/about-the-movement/";




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                  Type of movement                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'movement-type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-movement-type-radios'] == "On to a farm or premises")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving');
            }
        }
        else if (req.session.data['about-the-movement-movement-type-radios'] == "Off a farm or premises")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving');
            }
        }
        else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
        {
            // Continue to the next page

            if(! req.session.data['disease-configurator-types-of-movement-checkboxes'].includes("A short term visit or activity on a farm or premises") )
            {
                res.redirect('you-cannot-apply-movement-type');
            }
            // If the user needs to go back to 'check your answers' then take them directly there
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('animals-involved-activity');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('movement-type');
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////  For activity find out if animals are involved     ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'animals-involved-activity-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-animals-involved-activity-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/select-animals');
            }
        }
        else if (req.session.data['about-the-movement-animals-involved-activity-radios-yes-no'] == "No")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('check-answers');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('animals-involved-activity');
        }
    })















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    What are moving                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        req.session.data['about-the-movement-what-is-moving-radios-formatted'] = req.session.data['about-the-movement-what-is-moving-radios'].toLowerCase();

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/select-animals');
            }
        }
        else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Animal products")
        {
            // Continue to the next page

            if(! req.session.data['disease-configurator-scope-of-things-other-checkboxes'].includes("Animal products") )
            {
                res.redirect('what-is-moving/you-cannot-apply');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/select-animals');
            }
        }
        else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Germplasm")
        {
            // Continue to the next page

            if(! req.session.data['disease-configurator-scope-of-things-other-checkboxes'].includes("Germplasm") )
            {
                res.redirect('what-is-moving/you-cannot-apply');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/select-animals');
            }
        }
        else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Bedding and feed")
        {
            // Continue to the next page

            if(! req.session.data['disease-configurator-scope-of-things-other-checkboxes'].includes("Bedding and feed") )
            {
                res.redirect('what-is-moving/you-cannot-apply');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/select-animals');
            }
        }
        else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Animal by-products and waste materials")
        {
            // Continue to the next page

            if(! req.session.data['disease-configurator-scope-of-things-other-checkboxes'].includes("Animal by-products and waste materials") )
            {
                res.redirect('what-is-moving/you-cannot-apply');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/select-animals');
            }
        }
        else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Machinery and equipment")
        {
            // Continue to the next page

            if(! req.session.data['disease-configurator-scope-of-things-other-checkboxes'].includes("Machinery and equipment") )
            {
                res.redirect('what-is-moving/you-cannot-apply');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/enter-what-is-moving');
            }
        }
        else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses")
        {
            // Continue to the next page

            if(! req.session.data['disease-configurator-scope-of-things-other-checkboxes'].includes("Carcasses") )
            {
                res.redirect('what-is-moving/you-cannot-apply');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/select-animals');
            }
        }
        else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Something else")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('what-is-moving/enter-what-is-moving');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('what-is-moving');
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             First page of animals                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-select-animals-radios'] == "Cattle")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Cattle") )
                {
                    res.redirect('select-animals/you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('select-animals/quantity');
                }
                else
                {
                    res.redirect('select-animals/enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-animals-radios'] == "Sheep")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Sheep") )
                {
                    res.redirect('select-animals/you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('select-animals/quantity');
                }
                else
                {
                    res.redirect('enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-animals-radios'] == "Goats")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Goats") )
                {
                    res.redirect('select-animals/you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('select-animals/quantity');
                }
                else
                {
                    res.redirect('enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-animals-radios'] == "Pigs")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Pigs") )
                {
                    res.redirect('select-animals/you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('select-animals/quantity');
                }
                else
                {
                    res.redirect('enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-animals-radios'] == "Birds")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Birds") )
                {
                    res.redirect('select-animals/you-cannot-apply-animals');
                }
                else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                res.redirect('select-animals/birds');
            }
        }
        else if (req.session.data['about-the-movement-select-animals-radios'] == "Horses")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Horses") )
                {
                    res.redirect('select-animals/you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('select-animals/quantity');
                }
                else
                {
                    res.redirect('enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-animals-radios'] == "Another type of animal")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('select-animals/select-other-animals');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('select-animals/select-animals');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             Second page of animals                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/select-other-animals-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-select-other-animals-radios'] == "Deer")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Deer") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Llamas")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Llamas") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Alpacas")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Alpacas") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Camels")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Camels") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Buffalo")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Buffalo") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Rabbits")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Rabbits") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Fish")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Fish") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Snails")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                if(! req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].includes("Snails") )
                {
                    res.redirect('you-cannot-apply-animals');
                }
                else if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-select-other-animals-radios'] == "Another type of animal")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('other');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('select-other-animals');
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////          Entering other animal type                ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/other-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['about-the-movement-select-animals-other-text-input'] == undefined || req.session.data['about-the-movement-select-animals-other-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('other');
        }


        else
        {
                // everything with the input is fine so move on to next page

                // If the user needs to go back to 'check your answers' then take them directly there
                if (req.session.data['camefromcheckanswers'] == 'true')
                {
                    req.session.data['camefromcheckanswers'] = false;
                    res.redirect('check-answers');
                }
                else
                {
                    // This page name needs to be the next page the user gets to after successfully continuing
                    if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                    {
                        res.redirect('../../check-answers');
                    }
                    else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                             req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                    {
                        res.redirect('quantity');
                    }
                    else
                    {
                        res.redirect('../enter-what-is-moving');
                    }
                }

        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////           Selecting birds first list               ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/birds-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-birds-radios'] == "Chickens")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('birds/day-old-chicks');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-birds-radios'] == "Turkeys")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('birds/day-old-chicks');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-birds-radios'] == "Ducks")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('birds/day-old-chicks');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-birds-radios'] == "Geese")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('birds/day-old-chicks');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-birds-radios'] == "Birds of prey")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-birds-radios'] == "Racing pigeons")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('quantity');
                }
                else
                {
                    res.redirect('../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-birds-radios'] == "Another type of bird")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needsTHE_NEXT_PAGE_NAME to be the next page the user gets to after successfully continuing
                res.redirect('birds/other-birds');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('birds');
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////      Day old chicks for 4 bird types               ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/birds/day-old-chicks-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-day-old-chicks-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../quantity');
            }
        }
        else if (req.session.data['about-the-movement-day-old-chicks-radios-yes-no'] == "No")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../quantity');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('day-old-chicks');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////          Selecting birds second list               ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/birds/other-birds-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-other-birds-radios'] == "Birds in large enclosures (aviary birds)")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('../quantity');
                }
                else
                {
                    res.redirect('../../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-other-birds-radios'] == "Pheasant")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('../quantity');
                }
                else
                {
                    res.redirect('../../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-other-birds-radios'] == "Partridge")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('../quantity');
                }
                else
                {
                    res.redirect('../../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-other-birds-radios'] == "Quail")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('../quantity');
                }
                else
                {
                    res.redirect('../../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-other-birds-radios'] == "Grouse")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('../quantity');
                }
                else
                {
                    res.redirect('../../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-other-birds-radios'] == "Ostriches")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('../quantity');
                }
                else
                {
                    res.redirect('../../enter-what-is-moving');
                }
            }
        }
        else if (req.session.data['about-the-movement-other-birds-radios'] == "Another type of bird")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needsTHE_NEXT_PAGE_NAME to be the next page the user gets to after successfully continuing
                res.redirect('enter-bird-type');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('other-birds');
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////          Entering other type of bird               ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/birds/enter-bird-type-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['about-the-movement-enter-bird-type-text-input'] == undefined || req.session.data['about-the-movement-enter-bird-type-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('enter-bird-type');
        }

        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                if (req.session.data['about-the-movement-movement-type-radios'] == "A short term visit or activity on a farm or premises")
                {
                    res.redirect('../../../check-answers');
                }
                else if (req.session.data['about-the-movement-what-is-moving-radios'] == "Live animals"  ||
                         req.session.data['about-the-movement-what-is-moving-radios'] == "Carcasses"  )
                {
                    res.redirect('../quantity');
                }
                else
                {
                    res.redirect('../../enter-what-is-moving');
                }
            }
        }
    })









    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////    quantity of all live animals or carcases        ////////////////
    ////////////////                                                    ////////////////
    ////////////////                 NUMBER ENTRY                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/quantity-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";


        // Validation check if field is blank
        if (req.session.data['about-the-movement-quantity-number-input'] == undefined || req.session.data['about-the-movement-quantity-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('quantity');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['about-the-movement-quantity-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['about-the-movement-quantity-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeotwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('quantity');
            }
            else
            {
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );


                // Check input is a whole number
                if( numberinputfloat % 1 != 0 )
                {
                    // Trigger validation and relaunch the page
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypetwo'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('quantity');
                }


                else if ( numberinputfloat < 1 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefive'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('quantity');
                }



                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['about-the-movement-quantity-number-input'] = numberinputfloat.toLocaleString();


                    // If the user needs to go back to 'check your answers' then take them directly there
                    if (req.session.data['camefromcheckanswers'] == 'true')
                    {
                        req.session.data['camefromcheckanswers'] = false;
                        res.redirect('check-answers');
                    }
                    else
                    {
                        if (req.session.data['about-the-movement-what-is-moving-radios'] == 'Carcasses')
                        {
                            res.redirect('../../check-answers');
                        }
                        else
                        {
                            res.redirect('abattoir');
                        }

                    }
                }
            }

        }

    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////     if live animals are going to an abattoir       ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/abattoir-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-abattoir-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }
        }
        else if (req.session.data['about-the-movement-abattoir-radios-yes-no'] == "No")
        {
            // Continue to the next page

            // If the animal selected is PIGS
            if (req.session.data['about-the-movement-select-animals-radios'] == 'Pigs')
            {
                res.redirect('pigs-types');
            }

            // If the animal selected is CATTLE
            else if (req.session.data['about-the-movement-select-animals-radios'] == 'Cattle')
            {
                res.redirect('cattle-types');
            }

            // IF the animal selected is anything else
            else
            {
                res.redirect('../purpose');
            }

        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('abattoir');
        }
    })

















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      Type of cattle                ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/cattle-types-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-cattle-types-radios'] == "Calves")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('cattle-purpose');
            }
        }
        else if (req.session.data['about-the-movement-cattle-types-radios'] == "Heifers")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('cattle-purpose');
            }
        }
        else if (req.session.data['about-the-movement-cattle-types-radios'] == "Cows")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('cattle-purpose');
            }
        }
        else if (req.session.data['about-the-movement-cattle-types-radios'] == "Pregnant cows")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('cattle-purpose');
            }
        }
        else if (req.session.data['about-the-movement-cattle-types-radios'] == "Bulls")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('cattle-purpose');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('cattle-types');
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                  Cattle purpose                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/cattle-purpose-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-cattle-purpose-radios'] == "Breeding")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }
        }
        else if (req.session.data['about-the-movement-cattle-purpose-radios'] == "Fattening")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }
        }
        else if (req.session.data['about-the-movement-cattle-purpose-radios'] == "Suckling")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }
        }
        else if (req.session.data['about-the-movement-cattle-purpose-radios'] == "Dairy")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }
        }
        else if (req.session.data['about-the-movement-cattle-purpose-radios'] == "Something else")
        {
            // Continue to the next page

            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('../purpose');

        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('cattle-purpose');
        }
    })












    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                  Types of pigs                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/pigs-types-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-pigs-types-radios'] == "Piglets")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('pigs-purpose');
            }
        }
        else if (req.session.data['about-the-movement-pigs-types-radios'] == "Weaners")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('pigs-purpose');
            }
        }
        else if (req.session.data['about-the-movement-pigs-types-radios'] == "Gilts")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('pigs-purpose');
            }
        }
        else if (req.session.data['about-the-movement-pigs-types-radios'] == "Sows")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('pigs-purpose');
            }
        }
        else if (req.session.data['about-the-movement-pigs-types-radios'] == "Boars")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('pigs-purpose');
            }
        }
        else if (req.session.data['about-the-movement-pigs-types-radios'] == "Finishers")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('pigs-purpose');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('pigs-types');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                 Pigs purpose                       ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/select-animals/pigs-purpose-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-pigs-purpose-radios'] == "Breeding")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }
        }
        else if (req.session.data['about-the-movement-pigs-purpose-radios'] == "Growing for meat")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }
        }
        else if (req.session.data['about-the-movement-pigs-purpose-radios'] == "Something else")
        {
            // Continue to the next page
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('../purpose');

        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('pigs-purpose');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////              Purpose of the animals                ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/purpose-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['about-the-movement-purpose-text-input'] == undefined || req.session.data['about-the-movement-purpose-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('purpose');
        }

        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../check-answers');
            }
        }
    })




















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////           What species of germplasm, etc           ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/what-species-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['about-the-movement-what-species-text-input'] == undefined || req.session.data['about-the-movement-what-species-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('what-species');
        }


        else
        {

                // everything with the input is fine so move on to next page

                // If the user needs to go back to 'check your answers' then take them directly there
                if (req.session.data['camefromcheckanswers'] == 'true')
                {
                    req.session.data['camefromcheckanswers'] = false;
                    res.redirect('check-answers');
                }
                else
                {
                    // This page name needs to be the next page the user gets to after successfully continuing
                    res.redirect('enter-what-is-moving');
                }

        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       How much of the thing will be moved?         ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/enter-what-is-moving-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['about-the-movement-enter-what-is-moving-text-input'] == undefined ||
            req.session.data['about-the-movement-enter-what-is-moving-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('enter-what-is-moving');
        }

        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('enter-what-is-moving/quantity');
            }

        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       How much of the thing will be moved?         ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'what-is-moving/enter-what-is-moving/quantity-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['about-the-movement-enter-what-is-moving-quantity-text-input'] == undefined || req.session.data['about-the-movement-enter-what-is-moving-quantity-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('quantity');
        }

        else
        {

            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../check-answers');
            }

        }
    })




}
