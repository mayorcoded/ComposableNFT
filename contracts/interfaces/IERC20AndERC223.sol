pragma solidity 0.7.6;

interface IERC20AndERC223 {
    function transferFrom(address _from, address _to, uint _value) external returns (bool success);
    function transfer(address to, uint value) external returns (bool success);
    function transfer(address to, uint value, bytes calldata data) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);
}