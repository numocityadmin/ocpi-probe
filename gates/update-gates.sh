BASEDIR=$(dirname "$0")

cd $BASEDIR
git clone https://bitbucket.org/namp_eng/node-starter.git
mv node-starter/01_SourceCode/app/gates/* .
rm -rf node-starter
cd -
