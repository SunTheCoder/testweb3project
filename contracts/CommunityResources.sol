// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommunityResources {
    struct Resource {
        string name;
        string description;
        string resourceType;
        string location;
        address submitter;
        uint256 upVotes;
        uint256 downVotes;
        bool validated;
    }

    Resource[] public resources;

    function addResource(string memory _name, string memory _resourceType, string memory _location) public {
        resources.push(Resource({
            name: _name,
            resourceType: _resourceType,
            description: _location,
            location: _location,
            submitter: msg.sender,
            upVotes: 0,
            downVotes: 0,
            validated: false
        }));
    }

    function voteResource(uint256 _index, bool _vote) public {
        require(_index < resources.length, "Invalid resource index");
        Resource storage resource = resources[_index];
        
        if (_vote) {
            resource.upVotes++;
        } else {
            resource.downVotes++;
        }

        if (resource.upVotes > resource.downVotes + 5) {
            resource.validated = true;
        }
    }

    function getAllResources() public view returns (Resource[] memory) {
        return resources;
    }
}
