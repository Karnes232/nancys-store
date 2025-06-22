const fs = require('fs');
const path = require('path');
const https = require('https');

// Sanity configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

async function fetchLogoData() {
  const query = encodeURIComponent(`
    *[_type == "generalLayout"][0] {
      logo {
        asset->{
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    }
  `);

  const url = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.result);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function downloadLogo() {
  try {
    console.log('Fetching logo data from Sanity...');
    const data = await fetchLogoData();
    
    if (!data || !data.logo || !data.logo.asset) {
      console.error('No logo found in Sanity data');
      return;
    }

    const logoUrl = data.logo.asset.url;
    const altText = data.logo.alt || 'Company Logo';
    const { width, height } = data.logo.asset.metadata.dimensions;

    console.log('Logo URL:', logoUrl);
    console.log('Dimensions:', width, 'x', height);

    // Download the logo
    const logoPath = path.join(__dirname, '../public/logo.webp');
    
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(logoPath);
      https.get(logoUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Logo downloaded successfully to public/logo.webp');
          
          // Create a metadata file for the logo
          const metadata = {
            url: '/logo.webp',
            alt: altText,
            width,
            height
          };
          
          fs.writeFileSync(
            path.join(__dirname, '../src/lib/logo-metadata.json'),
            JSON.stringify(metadata, null, 2)
          );
          
          console.log('Logo metadata saved');
          resolve(metadata);
        });
      }).on('error', reject);
    });

  } catch (error) {
    console.error('Error downloading logo:', error);
  }
}

// Run the script
downloadLogo(); 