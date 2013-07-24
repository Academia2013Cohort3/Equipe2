#pragma strict

//Can we shoot
var	CanShoot:boolean = true;
var ShootForce: float = 20; 
var bulletPrefab: Transform;
var Spawnpos: Transform;
var Playerpos: Transform;
var MainCameraBoolean:boolean;
var Crouched:boolean;
var MainCameraFloat:float = 1;
var MainCamera:Transform;
var PlayerPosUnCrouch:Vector3;
var SpawnPoint:Vector3;
var PlayerPosAtSpawn:Vector3;
var MainCameraInitialPos:Vector3;
var MainCameraCrouchPos:Vector3;
var Ratio:Vector3;
var controller:CharacterController;
controller = GetComponent(CharacterController);

//Variables for the reload
var Bullets:int = 10;
var BulletsPerReload:float = 10;
/////////////Reload Timer/////////////////
//The amount of time spent reloading
var TimeOfReload:float = 2;	
//The timer itself
var TimeBefore:float;
var TimeNow:float;
var TimePassed:float;
//Did you press R?
var	StartReloadTimer:boolean = false;
var XY:float;
var AngleX:float;
var AngleY:float;

MainCameraInitialPos.y = MainCamera.transform.position.y;
MainCameraCrouchPos.y = MainCamera.transform.position.y;;

function Start () 
{
	
}
		
function Update () 
{
	TimeNow = Time.realtimeSinceStartup;
	TimePassed = TimeNow-TimeBefore;
	if(StartReloadTimer)
	{
		if(TimePassed > TimeOfReload)
    	{
    		StartReloadTimer = false;
    		Bullets = BulletsPerReload;
    	}
    }
    if(Input.GetMouseButtonDown(0))
    {
    	if(Bullets > 0)
    	{
    		//Shoot();
    		if(CanShoot)
    		{
        		Bullets -= 1;
        		var bullet = Instantiate(bulletPrefab,Spawnpos.transform.position,Quaternion.identity);
        		SpawnPoint = Spawnpos.transform.position;
        		PlayerPosAtSpawn = Playerpos.transform.position;
        		//The ratios to calculate the "ratio" of the x vs y vs z
				Ratio.x = SpawnPoint.x - PlayerPosAtSpawn.x;
				Ratio.y = SpawnPoint.y - PlayerPosAtSpawn.y;
				Ratio.z = SpawnPoint.z - PlayerPosAtSpawn.z;
        		bullet.rigidbody.velocity = Ratio*ShootForce;
        		XY = Mathf.Sqrt(((Ratio.x)*(Ratio.x))+((Ratio.z)*(Ratio.z)));
        		AngleX = -1 * Mathf.Rad2Deg * Mathf.Atan((Ratio.y)/(XY));
        		AngleY = Mathf.Rad2Deg * Mathf.Atan((Ratio.x)/(Ratio.z));
        		if(Ratio.x < 0 && Ratio.z < 0 || Ratio.x > 0 && Ratio.z < 0)
        		{
        			AngleY += 180;
        		}
        		bullet.transform.Rotate(AngleX,AngleY,0);
        		
    		}
        }
    }
    
    if(Input.GetKeyDown(KeyCode.R))
    {
    	if(Bullets == BulletsPerReload)
		{
			
		}
		else
		{
			if(!StartReloadTimer)
			{
				//We set the timer
				TimeBefore = Time.realtimeSinceStartup;
				//We start le timer
				StartReloadTimer = true;
			}
		} 
	}
	if(Input.GetKeyDown(KeyCode.LeftControl) || Input.GetKeyDown(KeyCode.RightControl))
	{
		MainCameraFloat *= -1;
		if(Crouched)
		{
			transform.Find("Main Camera").GetComponent(MouseLook).minimumY = 0;
		}
		else
		{
			transform.Find("Main Camera").GetComponent(MouseLook).minimumY = -60;
		}
		if(MainCameraFloat == 1)
		{
			this.transform.position.y += 1;
			transform.Find("Main Camera").position.y += (0.9070835 - (0.9070835)/2);
			controller.height = 2;
			Crouched = false;
		}
		else if(MainCameraFloat == -1)
		{
			transform.Find("Main Camera").position.y -= (0.9070835 - (0.9070835)/2);
			Crouched = true;
			controller.height = 1;
		}
	}
}

function OnCollisionStay(collision:Collision)
{
	
}

function OnCollisionExit()
{
	
}

/*function Shoot()
{
    if(CanShoot)
    {
        Bullets -= 1;
        var bullet = Instantiate(bulletPrefab,Spawnpos.transform.position,Quaternion.identity);
        SpawnPoint = Spawnpos.transform.position;
        PlayerPosAtSpawn = Playerpos.transform.position;
        //The ratios to calculate the "ratio" of the x vs y vs z
		Ratio.x = SpawnPoint.x - PlayerPosAtSpawn.x;
		Ratio.y = SpawnPoint.y - PlayerPosAtSpawn.y;
		Ratio.z = SpawnPoint.z - PlayerPosAtSpawn.z;
        bullet.rigidbody.velocity = Ratio*ShootForce;
    }
}*/