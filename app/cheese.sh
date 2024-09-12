#!/bin/bash

read -p "

Enter version number to archive the 'latest' build.
This should be numbers separated by full stops.

For example  1.0.0

" versionNumber


# check version number contains only numbers and full stops
regex="^[0-9\.]+$"
if [[ ! $versionNumber =~ $regex ]]; then
    echo "
ERROR: ${versionNumber} is not in the format '1.0.0'"
    exit;
fi

# Add in the v at before version number
versionDot="v$versionNumber"

# Make a varioable with underscore instead of full stops
version="${versionDot//./_}"

# check folder doesn't already exist
directory_name="views/${version}"

if [ -d "$directory_name" ]; then
    echo "
ERROR: ${versionDot} already exists at   views/${version}

Try again with a unique version number."
    exit;
fi


#echo "
#Archiving latest version to ${versionDot}";

#echo "
#Archiving latest version underscore to ${version}";


# add new version to archive index
#sed  -i '' -e "s/<!-- NEW VERSION -->/ \<\!-- NEW VERSION --\>\n            \<li class=\"govuk-!-margin-bottom-7\"\>\n                \<h2 class=\"govuk-heading-s\"\>${versionDot} - $(date +"%d %B %Y")\<\/h2\>\n                \<p class=\"govuk-body\"\> \<a class=\"govuk-link\" href=\"${versionDot}\/version-index\" \>View version\<\/a\> \<\/p\>\n                \<p class=\"govuk-body\"\>Summary of changes\<\/p\>\n                \<ul class=\"govuk-list govuk-list--bullet\"\>\n                    \<li\>PLACEHOLDER<\/li\>\n                    \<li\>PLACEHOLDER<\/li\>\n                    \<li\>PLACEHOLDER<\/li\>\n                \<\/ul\>\n            \<\/li\>\n/g" views/index.html

# remove archive list from archive index page
#sed  -i '' -e "/\<\!-- VERSION HISTORY START --\>/,/\<\!-- VERSION HISTORY END --\>/d" views/${version}/index.html

# update heading on archived page
#sed  -i '' -e "/\<\!-- HEADING START --\>/,/\<\!-- HEADING END --\>/d" views/${version}/index.html
#sed  -i '' -e "s/  \<\!-- HEADING --\>/  \<\!-- HEADING --\>\n    \<h1 class=\"govuk-heading-l govuk-\!-margin-bottom-0\"\>Archived version - ${versionDot}\<\/h1\>\n    \<p class=\"govuk-hint\"\>Archived $(date +"%d %B %Y")\<\/p\>\n    \<p\>\n      \<a href=\"\/latest\"\>Return to latest version\<\/a\>\n    \<\/p\>    \<h2 class=\"govuk-heading-s\"\>Updates\<\/h2\>    \<ul class=\"govuk-list govuk-list--bullet\"\>      \<li\>Description of changes\<\/li\>    \<\/ul\>    \<h2 class=\"govuk-heading-m\"\>Contents\<\/h2\>/g" views/${version}/index.html