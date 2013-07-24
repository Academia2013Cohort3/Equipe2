#pragma strict

function Start () 
{
	
}

function Update()
{

}


function OnCollisionStay(collision:Collision)
{
		Destroy(gameObject,5);
		this.rigidbody.useGravity = true;
}