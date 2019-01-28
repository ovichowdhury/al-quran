pragma solidity >=0.4.21 <0.6.0;


contract QuranContract {
    address private owner;
    
    mapping(uint => string) private quranAyatHash;
    
    constructor() public {
        owner = msg.sender;
    }
    
    event ayatAdded(uint ayatNumber, string ayatHash);
    
    event ayatDeleted(uint ayatNumber);
    
    modifier onlyOwner {
        require(msg.sender == owner, "Not Authorized");
        _;
    }
    
    function addAyat(uint ayatNumber, string memory ayatHash) public onlyOwner {
        quranAyatHash[ayatNumber] = ayatHash;
        emit ayatAdded(ayatNumber, ayatHash);
    }
    
    function getAyat(uint ayatNumber) public view returns(string memory){
        return quranAyatHash[ayatNumber];
    }
    
    function deleteAyat(uint ayatNumber) public onlyOwner {
        delete quranAyatHash[ayatNumber];
        emit ayatDeleted(ayatNumber);
    }
    
}