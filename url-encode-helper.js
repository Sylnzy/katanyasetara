// Utility untuk URL encode password dalam connection string
// Gunakan ini jika password mengandung karakter khusus

function encodePassword(password) {
    return password
        .replace(/#/g, '%23')
        .replace(/@/g, '%40')
        .replace(/!/g, '%21')
        .replace(/\$/g, '%24')
        .replace(/&/g, '%26')
        .replace(/\+/g, '%2B')
        .replace(/=/g, '%3D')
        .replace(/\?/g, '%3F');
}

function fixConnectionString(connectionString) {
    if (!connectionString) return connectionString;

    // Extract password from connection string
    const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@(.+)/);
    if (!match) return connectionString;

    const [, username, password, hostAndDb] = match;
    const encodedPassword = encodePassword(password);

    return `postgresql://${username}:${encodedPassword}@${hostAndDb}`;
}

// Test function
function testPasswordEncoding() {
    const originalPassword = 'Sylnzy#123a';
    const encoded = encodePassword(originalPassword);

    console.log('Original password:', originalPassword);
    console.log('Encoded password:', encoded);
    console.log('Expected: Sylnzy%23123a');
    console.log('Match:', encoded === 'Sylnzy%23123a' ? '✅' : '❌');

    const originalString = 'postgresql://postgres:Sylnzy#123a@db.vhoevbmydcfnxdhbtxtm.supabase.co:5432/postgres';
    const fixedString = fixConnectionString(originalString);

    console.log('\nOriginal string:', originalString);
    console.log('Fixed string:', fixedString);
}

module.exports = {
    encodePassword,
    fixConnectionString,
    testPasswordEncoding
};

// Run test if this file is executed directly
if (require.main === module) {
    testPasswordEncoding();
}
