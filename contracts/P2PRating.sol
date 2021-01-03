pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract P2PRating {
   
    using SafeMath for uint256;
    struct User {
        string name;
        string email;
        uint totalRatingSum;
        uint avgRating;
    }
   
    struct Rating {
        address byAddress;
        string byEmail;
        uint timestamp;
        uint rating;
    }
   
    mapping(address => bool) public registeredAddresses;
    mapping(string => bool) public registeredEmails;
    mapping(address => User) public registeredUsers;
    mapping(address => Rating[]) public ratings;
    mapping(address => mapping(address => bool)) public alreadyRated;
    address[] public users;
   
    function register(string memory _name, string memory _email) public returns(bool) {
        require(!registeredAddresses[msg.sender], "Address already registered");
        require(!registeredEmails[_email], "Email already registered");
       
        User memory u = User({
            name:_name,
            email:_email,
            avgRating:0,
            totalRatingSum:0
        });
       
        registeredAddresses[msg.sender] = true;
        registeredEmails[_email] = true;
        registeredUsers[msg.sender] = u;
        users.push(msg.sender);
       
        return true;
    }
   
    function rate(address _user, uint _rating) public returns(bool) {
        require(_user != msg.sender, "You can not rate yourself here");
        require(registeredAddresses[msg.sender], "You are not registered yet");
        require(registeredAddresses[_user], "The user whom u r rating is not registered user");
        require(!alreadyRated[_user][msg.sender], "You have already rated this user");
        require(_rating >= 1, "Rating lower limit error");
        require(_rating <= 5, "Rating upper limit error!");
       
        User memory u = registeredUsers[msg.sender];
        Rating memory r = Rating({
            byAddress: msg.sender,
            byEmail: u.email,
            timestamp: block.timestamp,
            rating: _rating
        });
       
        ratings[_user].push(r);
       
        alreadyRated[_user][msg.sender] = true;
        User storage u1 = registeredUsers[_user];
        u1.totalRatingSum = u1.totalRatingSum.add(_rating.mul(10**18));
        u1.avgRating = u1.totalRatingSum.div(ratings[_user].length);
       
        return true;
    }

    function getAllUsers() public view returns(address[] memory) {
        return users;
    }

    function getUserRating(address _user) public view returns(Rating[] memory) {
        return ratings[_user];
    }
   
}