#!/bin/bash

read -p "

Enter version number to archive the 'latest' build with.
This should be in the format v0.0.0
" versionDot

# convert version number to lowercase
versionDot=$(echo "$versionDot" | tr '[:upper:]' '[:lower:]')

# check version number is valid format
if [ ! ${versionDot:0:1} == "v" ]; then
    echo "ERROR: ${versionDot} is not in the format 'v1.0.0'"
    exit;
fi

if [[ ! $versionDot == *.* ]] ; then
    echo "ERROR: ${versionDot} is not in the format 'v1.0.0'"
    exit;
fi

version="${versionDot//./_}"
# check folder doesn't already exist
if [ -d "views/${version}" ]; then
    echo "ERROR: ${versionDot} already exists at views/${version}. Try again with a unique version number."
    exit;
fi
echo "
Archiving latest version to ${versionDot}";


# add new version to archive index
sed  -i '' -e "s/<!-- NEW VERSION -->/ \<\!-- NEW VERSION --\>\n            \<li class=\"govuk-!-margin-bottom-7\"\>\n                \<h2 class=\"govuk-heading-s\"\>${versionDot} - $(date +"%d %B %Y")\<\/h2\>\n                \<p class=\"govuk-body\"\> \<a class=\"govuk-link\" href=\"${versionDot}\/version-index\" \>View version\<\/a\> \<\/p\>\n                \<p class=\"govuk-body\"\>Summary of changes\<\/p\>\n                \<ul class=\"govuk-list govuk-list--bullet\"\>\n                    \<li\>PLACEHOLDER<\/li\>\n                    \<li\>PLACEHOLDER<\/li\>\n                    \<li\>PLACEHOLDER<\/li\>\n                \<\/ul\>\n            \<\/li\>\n/g" views/index.html

# remove archive list from archive index page
#sed  -i '' -e "/\<\!-- VERSION HISTORY START --\>/,/\<\!-- VERSION HISTORY END --\>/d" views/${version}/index.html

# update heading on archived page
#sed  -i '' -e "/\<\!-- HEADING START --\>/,/\<\!-- HEADING END --\>/d" views/${version}/index.html
#sed  -i '' -e "s/  \<\!-- HEADING --\>/  \<\!-- HEADING --\>\n    \<h1 class=\"govuk-heading-l govuk-\!-margin-bottom-0\"\>Archived version - ${versionDot}\<\/h1\>\n    \<p class=\"govuk-hint\"\>Archived $(date +"%d %B %Y")\<\/p\>\n    \<p\>\n      \<a href=\"\/latest\"\>Return to latest version\<\/a\>\n    \<\/p\>    \<h2 class=\"govuk-heading-s\"\>Updates\<\/h2\>    \<ul class=\"govuk-list govuk-list--bullet\"\>      \<li\>Description of changes\<\/li\>    \<\/ul\>    \<h2 class=\"govuk-heading-m\"\>Contents\<\/h2\>/g" views/${version}/index.html