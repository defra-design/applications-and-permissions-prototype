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

echo "
Archiving latest version to ${version}";

# creating files
cp -r views/latest views/${version};
cp -r routes/latest routes/${version};
cp -r assets/sass/_latest.scss assets/sass/_${version}.scss;
cp -r views/layouts/latest.html views/layouts/${version}.html;

# updating routes file
#sed -i '' -e "s/setupRouter('\/latest')/setupRouter('\/${version}')/g" "routes/${version}.js"
sed -i '' -e "s/const version = 'latest'/const version = '${version}'/g" "routes/${version}/version.js"

echo "
javascript updated";

# updating scss file
sed -i '' -e "s/.latest/.${version}/g" "assets/sass/_${version}.scss"

echo "
css updated";

# updating layout file
sed -i '' -e "s/version = \"latest\"/version = \"${version}\"/g" "views/layouts/${version}.html"

echo "
layout file updated";

# archived version to use new layout file
find "./views/${version}" -name "*.html" -type f -exec sed -i '' -e "s/\"layouts\/latest.html\"/\"layouts\/${version}.html\"/g" {} \;

# import new scss file
sed  -i '' -e "1s/^/@import '_${version}.scss';\n/g" assets/sass/application.scss

echo "
css reference updated";

# import new routes file
sed  -i '' -e "s/require('.\/routes\/latest\/version.js');/require('.\/routes\/${version}\/version.js');\nrequire('.\/routes\/latest\/version.js');/g" routes.js

echo "
new routes imported into routes.js";

# add new version to archive index
sed  -i '' -e "s/<!-- NEW VERSION -->/\<\!-- NEW VERSION --\>\n            \<li class=\"govuk-!-margin-bottom-7\"\>\n                \<h2 class=\"govuk-heading-s\"\>${versionDot} - $(date +"%d %B %Y")\<\/h2\>\n                \<p class=\"govuk-body\"\> \<a class=\"govuk-link\" href=\"${version}\/version-index\" \>View version\<\/a\> \<\/p\>\n                \<p class=\"govuk-body\"\>Summary of changes\<\/p\>\n                \<ul class=\"govuk-list govuk-list--bullet\"\>\n                    \<li\>PLACEHOLDER<\/li\>\n                    \<li\>PLACEHOLDER<\/li\>\n                    \<li\>PLACEHOLDER<\/li\>\n                \<\/ul\>\n            \<\/li\>\n/g" views/index.html

echo "
index page updated";